
let commande = require("../models/commande.js");
let notification = require("../models/notification.js");

let commandeController = {};

// Show list of commandes
commandeController.list = function(req, res) {
  commande.find(
    {user: req.params.user_id},
  ).populate('client').sort({addDate: -1}).exec(function (err, commande) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: commande});
    }
  });
};

commandeController.listForClient = function(req, res) {
  commande.find(
    {user: req.params.user_id, client: req.params.client_id})
    .sort({addDate: -1}).exec(
    function (err, commande) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: commande});
    }
  });
};

commandeController.getOne = function(req, res) {
  commande.findById(
    req.params.id).populate('client').exec(function(err, result) {
      if (err) {
        res.json({success: false})
      } else {
        res.json({success: result ? true : false, data: result})
      }
    })
}

// Show commande by id
commandeController.show = function(req, res) {
  commande.findOne({_id: req.params.id}).exec(function (err, commande) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: commande});
    }
  });
};


// Save new commande
commandeController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newcommande = req.body.commande;
  ///////////////////////////////
  let c = new commande(newcommande)
  c.save((err, ncommande) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      const notifif = {
        user: req.body.commande.user,
        type: 'commande',
        content: {
          title: 'Une commande de ' + req.body.client.name,
          img: req.body.client.img,
          id: ncommande._id
        }
      }
      let ntf = new notification(notifif);
      ntf.save((err, notifif) => {
        const room = req.body.commande.user;
        req.io.to(room).emit('new_commande', 'Update');
       // let socketUserId = req.getSocketIds()[req.body.commande.user];
       //  if (socketUserId) req.io.to(socketUserId).emit('new_commande', 'kozy');
        res.json({success: true, _id: ncommande._id})
      })
     
    }
  });
};

// Update one commande
commandeController.update = function(req, res) {
  const setting = req.body.content;
  console.log(setting);
  commande.findByIdAndUpdate(req.params.id, {
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
// Delete one commande
commandeController.delete = function(req, res) {
  commande.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("commande deleted!");
      res.json({success: true})
    }
  });
};

module.exports = commandeController;