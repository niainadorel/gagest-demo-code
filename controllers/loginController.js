
let login = require("../models/login.js");
let user = require("../models/user.js");
let jwt = require('jsonwebtoken');
const config = require('../config.js');
let loginController = {};


// check login
loginController.checkLogin = function(req, res) {
  login.findOne({
    email: req.body.email,
    password: req.body.password
  }).populate('user').exec(function (err, nlogin) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
     let token = jwt.sign({username: req.body.email},
        config.secret,
        { expiresIn: '24h' // expires in 24 hours
        }
      );
      // res.json({success: true, data: (login ? {user: login.user, token: token} : null)});
      // res.json({success: nlogin ? true : false, data: (nlogin ? {user: nlogin.user, token: 'null'} : null)});
      if (!nlogin) {
        res.json({success: false, message: 'NOT_EXIST'});
      } else {
        if (nlogin.user.status === 'disabled') {
          res.json({success: false, message: 'DISABLED'})
        } else {
          res.json({success: true, data: {user: nlogin.user, token: token}});
        }
      }
    }
  });
};

loginController.changePassword = function(req, res) {
  login.findOneAndUpdate({
    email: req.body.email,
    password: req.body.lastPassword
  }, {
    $set: {password: req.body.password}
  }).exec(function (err, nlogin) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
    
      res.json({success: nlogin ? true : false, data: (nlogin ? '' : 'ERROR_PASSWORD')});
    }
  });
};


// Update one login
loginController.update = function(req, res) {
  login.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content} }, { new: true }, function (err, login) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: login._id});
    }
  });
};

// Delete one login
loginController.delete = function(req, res) {
  login.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("login deleted!");
      res.json({success: true})
    }
  });
};

loginController.verify = function(req, res) {
  login.findOne({email: req.params.username}).exec((err, result) => {
    if (err) {
      res.json({success: false})
    } else {
      // console.log(result)
      res.json({success: true, exist: !!result})
    }
  })
}

module.exports = loginController;