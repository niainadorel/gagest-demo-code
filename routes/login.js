
let express = require('express');
let router = express.Router();
let login = require("../controllers/loginController.js");


router.get('/list', function(req, res) {
    login.list(req, res);
});

router.get('/show/:id', function(req, res) {
    login.show(req, res);
});

router.post('/save', function(req, res) {
    login.save(req, res);
});

router.post('/update/:id', function(req, res) {
    login.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    login.delete(req, res);
});
router.post('/checkLogin', function(req, res) {
	login.checkLogin(req, res);
})
router.post('/changePassword', function(req, res) {
	login.changePassword(req, res);
})


module.exports = router;
