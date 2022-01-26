
let client = require("../models/client.js");

let clientController = {};

// check login
clientController.checkLogin = function(req, res) {
  client.findOne({
    username: req.body.username,
    password: req.body.password
  }).populate('user').exec(function (err, nlogin) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false, message: 'SERVER_ERROR'})
    }
    else {
     // let token = jwt.sign({username: req.body.email},
     //    config.secret,
     //    { expiresIn: '24h' // expires in 24 hours
     //    }
     //  );
      // res.json({success: true, data: (login ? {user: login.user, token: token} : null)});
      if (!nlogin) {
        res.json({success: false, message: 'NOT_EXIST'})
      } else if (nlogin.user.status === "disabled") {
        res.json({success: false, message: 'DISABLED_ACCOUNT'})
      } else {
        delete nlogin.username;
        delete nlogin.password;
        client.findOneAndUpdate({_id: nlogin._id}, {
          $set: {connected: true}
        }, function(err, temp) {
           res.json({
          success: true,
          data:
            { client: nlogin,
              user: {_id: nlogin.user._id, name: nlogin.user.name},
              token: 'null'
            }
          });
        })
       
      }
    }
  });
};
clientController.getbyid = function(req, res) {
  client.findById(
    req.params.id
  ).populate('user').exec(function (err, nlogin) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false, message: 'SERVER_ERROR'})
    }
    else {
     // let token = jwt.sign({username: req.body.email},
     //    config.secret,
     //    { expiresIn: '24h' // expires in 24 hours
     //    }
     //  );
      // res.json({success: true, data: (login ? {user: login.user, token: token} : null)});
      if (!nlogin) {
        res.json({success: false, message: 'NOT_EXIST'})
      } else if (nlogin.user.status === "disabled") {
        res.json({success: false, message: 'DISABLED_ACCOUNT'})
      } else {
        delete nlogin.username;
        delete nlogin.password;
        client.findOneAndUpdate({_id: nlogin._id}, {
          $set: {connected: true}
        }, function(err, temp) {
           res.json({
          success: true,
          data:
            { client: nlogin,
              user: {_id: nlogin.user._id, name: nlogin.user.name},
              token: 'null'
            }
          });
        })
       
      }
    }
  });
};

// Show list of clients
clientController.list = function(req, res) {
  client.find( {user: req.params.user_id},(function (err, product) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: product});
    }
  }));
};

// Show client by id
clientController.show = function(req, res) {
  client.findOne({_id: req.params.id}).exec(function (err, client) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: client});
    }
  });
};


// Save new client
clientController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newclient = req.body.data;
  ///////////////////////////////
  let c = new client(newclient)
  c.save((err, nclient) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: nclient._id})
    }
  });
};

// Update one client
clientController.update = function(req, res) {
  const setting = req.body.content;
  console.log(setting);
  client.findByIdAndUpdate(req.params.id, {
    $set: setting
  }, { new: true }, function (err, nclient) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: 'Done'});
    }
  });
};

// Delete one client
clientController.delete = function(req, res) {
  client.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("client deleted!");
      res.json({success: true})
    }
  });
};

module.exports = clientController;