const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express(),
      adminConfig = require('./adminconfig.json');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let jwt = require('jsonwebtoken');
const config = require('./config.js');

let socketRooms = {};
// routes
const product = require('./routes/product');
const user = require('./routes/user');
const categorie = require('./routes/categorie');
const notification = require('./routes/notification');
const login = require('./routes/login');
const entry = require('./routes/entry');
const sortie = require('./routes/sortie');
const fournisseur = require('./routes/fournisseur');
const client = require('./routes/client');
const commande = require('./routes/commande');
const language = require('./routes/language');
const colisontheway = require('./routes/colisontheway');

const dbUrl = 'mongodb://localhost:27017/gagest';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '15mb'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(function(req,res,next){
  req.io = io;
  req.getsocketRooms = () => socketRooms;
  next();
})


app.use('/api/products', product);
app.use('/api/users', user);
app.use('/api/categories', categorie);
app.use('/api/notifications', notification);
app.use('/api/logins', login);
app.use('/api/entry', entry);
app.use('/api/sorties', sortie);
app.use('/api/clients', client);
app.use('/api/fournisseurs', fournisseur);
app.use('/api/commandes', commande);
app.use('/api/languages', language);
app.use('/api/colis', colisontheway);

// Dashboard
app.use('/dashboard', express.static('./public/gagest-admin'))

app.use('/', express.static('./public/gagest-desk'))

app.post('/api/checkadmin', (req, res) => {
  if (req.body.email === adminConfig.username && req.body.password === adminConfig.password) {
    let token = jwt.sign(
      {username: req.body.username},
      config.adminSecret, { expiresIn: '24h'}
    );
    res.json({success: true, token: token})
  } else {
    res.json({success: false})
  }
});

const port = process.env.PORT || 3010;
server.listen(port, () => {
  console.log('App running on port ' + port)
})

io.on("connection", (socket) => {
    console.info(`Client connected \n\t[id=${socket.id}]`);
    // initialize this client's sequence number
    // sequenceNumberByClient.set(socket, 1);
    console.log('new client on socket')

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {

      console.log(socketRooms[socket.id], ' leave');
      socket.leave(socketRooms[socket.id]);
      delete socketRooms[socket.id];
        // console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("save_socket", (message) => {
      console.log("sockettttttt===============", message);
      socket.join(message);
      socketRooms[socket.id] = message
      console.info(`Client connected \n\t ${message} : [id=${socket.id}]`);
    })
    socket.on("leave_room", (message) => {
      socket.leave(message);
      console.log('client disconnected', message);
    })
});