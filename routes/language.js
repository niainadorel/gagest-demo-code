
let express = require('express');
let router = express.Router();
let language = require("../controllers/languageController.js");


router.get('/list', function(req, res) {
    language.list(req, res);
});

router.get('/show/:id', function(req, res) {
    language.show(req, res);
});

router.post('/save', function(req, res) {
    language.save(req, res);
});

router.post('/update/:id', function(req, res) {
    language.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    language.delete(req, res);
});

module.exports = router;
