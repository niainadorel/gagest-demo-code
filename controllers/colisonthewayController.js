
let colisontheway = require("../models/colisontheway.js");

let colisonthewayController = {};

// Show list of colisontheways
colisonthewayController.list = function(req, res) {
  colisontheway.find({user: req.params.user_id}, (function (err, colisontheway) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: colisontheway});
    }
  }));
};

// Show colisontheway by id
colisonthewayController.show = function(req, res) {
  colisontheway.findOne({_id: req.params.id}).exec(function (err, colisontheway) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: colisontheway});
    }
  });
};


// Save new colisontheway
colisonthewayController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newcolisontheway = req.body.colis;
  ///////////////////////////////
  let c = new colisontheway(newcolisontheway)
  c.save((err, ncolisontheway) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: ncolisontheway._id})
    }
  });
};

// Update one colisontheway
colisonthewayController.update = function(req, res) {
  const setting = req.body.content;
  console.log(setting);
  colisontheway.findByIdAndUpdate(req.params.id, {
    $set: setting
  }, { new: true }, function (err, ncolis) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: 'Done'});
    }
  });
};


// Delete one colisontheway
colisonthewayController.delete = function(req, res) {
  colisontheway.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("colisontheway deleted!");
      res.json({success: true})
    }
  });
};

module.exports = colisonthewayController;