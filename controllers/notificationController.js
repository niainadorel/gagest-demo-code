
let notification = require("../models/notification.js");

let notificationController = {};

// Show list of notifications
notificationController.list = function(req, res) {
  notification.find({
    user: req.params.user_id,
  }).sort({addDate: 1}).exec((function (err, notification) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: notification});
    }
  }));
};

// Show notification by id
notificationController.show = function(req, res) {
  notification.findOne({_id: req.params.id}).exec(function (err, notification) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: notification});
    }
  });
};


// Save new notification
notificationController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newnotification = req.body.data;
  ///////////////////////////////
  let n = new notification(newnotification)
  n.save((err, nnotification) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: nnotification._id})
    }
  });
};

// Update one notification
notificationController.update = function(req, res) {
  const setting = req.body.update
  notification.findByIdAndUpdate(req.params.id, { $set: setting }, { new: true }, function (err, notification) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: notification._id});
    }
  });
};

// Delete one notification
notificationController.delete = function(req, res) {
  notification.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("notification deleted!");
      res.json({success: true})
    }
  });
};

module.exports = notificationController;