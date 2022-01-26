
let express = require('express');
let router = express.Router();
let colisontheway = require("../controllers/colisonthewayController.js");


router.get('/list/:user_id', function(req, res) {
    colisontheway.list(req, res);
});

router.get('/show/:id', function(req, res) {
    colisontheway.show(req, res);
});

router.post('/save', function(req, res) {
    colisontheway.save(req, res);
});

router.post('/update/:id', function(req, res) {
    colisontheway.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    colisontheway.delete(req, res);
});

module.exports = router;
