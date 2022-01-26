
let fournisseur = require("../models/fournisseur.js");

let fournisseurController = {};

fournisseurController.getbyid = function(req, res) {
  fournisseur.findById(
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
        fournisseur.findOneAndUpdate({_id: nlogin._id}, {
          $set: {connected: true}
        }, function(err, temp) {
           res.json({
          success: true,
          data:
            { fournisseur: nlogin,
              user: {_id: nlogin.user._id, name: nlogin.user.name},
              token: 'null'
            }
          });
        })
       
      }
    }
  });
};

// Show list of fournisseurs
fournisseurController.list = function(req, res) {
  fournisseur.find( {user: req.params.user_id},(function (err, product) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: product});
    }
  }));
};

// Show fournisseur by id
fournisseurController.show = function(req, res) {
  fournisseur.findOne({_id: req.params.id}).exec(function (err, fournisseur) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: fournisseur});
    }
  });
};


// Save new fournisseur
fournisseurController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newfournisseur = req.body.data;
  ///////////////////////////////
  let c = new fournisseur(newfournisseur)
  c.save((err, nfournisseur) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: nfournisseur._id})
    }
  });
};

// Update one fournisseur
fournisseurController.update = function(req, res) {
  const setting = req.body.content;
  console.log(setting);
  fournisseur.findByIdAndUpdate(req.params.id, {
    $set: setting
  }, { new: true }, function (err, nfournisseur) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: 'Done'});
    }
  });
};

// Delete one fournisseur
fournisseurController.delete = function(req, res) {
  fournisseur.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("fournisseur deleted!");
      res.json({success: true})
    }
  });
};

module.exports = fournisseurController;