
let express = require('express');
let router = express.Router();
let notification = require("../controllers/notificationController.js");


router.get('/list/:user_id', function(req, res) {
    notification.list(req, res);
});

router.get('/show/:id', function(req, res) {
    notification.show(req, res);
});

router.post('/save', function(req, res) {
    notification.save(req, res);
});

router.post('/update/:id', function(req, res) {
    notification.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    notification.delete(req, res);
});

module.exports = router;
