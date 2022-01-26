
let express = require('express');
let router = express.Router();
let user = require("../controllers/userController.js");

let jwt = require('jsonwebtoken');
const config = require('../config.js');

checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

checkAdminToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.adminSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};


router.get('/list', function(req, res) {
    user.list(req, res);
});
router.get('/getforadmin',checkAdminToken, function(req, res) {
    user.getforadmin(req, res);
});


router.get('/show/:id', function(req, res) {
    user.show(req, res);
});

router.post('/save', function(req, res) {
    user.save(req, res);
});

router.post('/update/:id', function(req, res) {
    user.update(req, res);
});
router.post('/updateByAdmin/:id', checkAdminToken, function(req, res) {
  user.updateByAdmin(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    user.delete(req, res);
});

router.get('/getData/:id', checkToken, function(req, res) {
	user.getData(req, res);
})
router.get('/verifyAdminToken', checkAdminToken, function(req, res) {
  res.json({success: true});
});


module.exports = router;
