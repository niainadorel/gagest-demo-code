
let express = require('express');
let router = express.Router();
let client = require("../controllers/clientController.js");


router.get('/list/:user_id', function(req, res) {
    client.list(req, res);
});
router.post('/checkLogin', function(req, res) {
	client.checkLogin(req, res);
})
router.get('/getbyid/:id', function(req, res) {
	client.getbyid(req, res);
})
router.get('/show/:user_id/:client_id', function(req, res) {
    client.show(req, res);
});

router.post('/save', function(req, res) {
    client.save(req, res);
});

router.post('/update/:id', function(req, res) {
    client.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    client.delete(req, res);
});

module.exports = router;
