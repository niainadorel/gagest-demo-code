
let user = require("../models/user.js");
let login = require("../models/login.js");
let categorie = require("../models/categorie.js");
let entry = require("../models/entry.js");
let sortie  = require("../models/sortie.js");

let jwt = require('jsonwebtoken');
const config = require('../config.js');

let userController = {};

// Show list of users
userController.list = function(req, res) {
  user.find((function (err, user) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: user});
    }
  }));
};

// Show list of users
userController.getforadmin = function(req, res) {
  user.find((function (err, user) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: user, sockets: req.io.sockets.adapter.rooms});
    }
  }));
};




// Show user by id
userController.show = function(req, res) {
  user.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: user});
    }
  });
};


// Save new user
userController.save = function(req, res) {
  console.log('here');
  login.findOne({email: req.body.logindata.email}).exec(function(err, result) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err, type: 'SERVER_ERR'})
    } else {
      if (result != null) {
        res.json({success: false, type: 'EMAIL_EXIST'})
      } else {
        let newuser = req.body.userdata;
        let u = new user(newuser)
        u.save((err, nuser) => {
          console.log('done')
          if(err) {
            console.log(err);
            res.json({success: false});
          } else {
            let newlogin = req.body.logindata;
            newlogin.user = nuser._id;
            let l = new login(newlogin);
            l.save((err, nlogin) => {
              if(err) {
                console.log(err);
                res.json({success: false});
              } else {
                let n_c = new categorie({
                  user: nuser._id,
                  categories: []
                })
                n_c.save((err, ncateg) => {
                  if (err) {
                    console.log(err);
                    res.json({success: false})
                  } else {
                    let n_a = new entry({user: nuser._id});
                    n_a.save((err, nacaht) => {
                      if(err) {
                        console.log(err);
                        res.json({success: false, error: err})
                      } else {
                        let n_com = new sortie({user: nuser._id});
                        n_com.save((err, nsortie) => {
                          if (err) {
                            console.log(err);
                            res.json({success: false, error: err})
                          } else {
                            let token = jwt.sign({username: req.body.logindata.email},
                              config.secret,
                              { expiresIn: '24h' // expires in 24 hours
                              }
                            );
                            console.log('new account created [_id]::: ', nuser._id)
                            res.json({success: true, user: nuser, token: token})
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        });
      }
    }

  })
};

userController.getData = function(req, res) {
  user.findOne({_id: req.params.id}, function(err, result) {
    if (err) {
      res.json({success: false})
    } else {
      if(!result || result.status === 'disabled') {
        res.json({success: false, message: 'DISABLED'})
      } else {
        res.json({success: true, data: result})
      }
    }
  })
}

// Update one user
userController.update = function(req, res) {
  const setting = req.body.content;
  if (setting.activeLink) {
    delete setting.activeLink;
  }
  if (setting.typeAccount) {
    delete setting.typeAccount;
  }
  console.log(req.params.id);
  console.log('status', setting.status);
  const room = req.params.id
  if (setting.status === 'disabled') {
    req.io.to(room).emit('disconnect_user');
  }
  user.findByIdAndUpdate(req.params.id, { $set: setting }, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: user._id});
    }
  });
};

userController.updateByAdmin = function(req, res) {
  const setting = req.body.content;
  console.log(req.params.id);
  console.log('status', setting.status);
  console.log(setting);
  const room = req.params.id
  if (setting.status === 'disabled') {
    req.io.to(room).emit('disconnect_user');
  }
  user.findByIdAndUpdate(req.params.id, { $set: setting }, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: user._id});
    }
  });
};

// Delete one user
userController.delete = function(req, res) {
  user.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("user deleted!");
      res.json({success: true})
    }
  });
};

module.exports = userController;