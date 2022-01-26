
let express = require('express');
let router = express.Router();
let sortie = require("../controllers/sortieController.js");


router.get('/list/:user_id', function(req, res) {
    sortie.list(req, res);
});

router.get('/show/:id', function(req, res) {
    sortie.show(req, res);
});

router.get('/showAll', function(req, res) {
    sortie.showAll(req, res);
});

router.post('/save', function(req, res) {
    sortie.save(req, res);
});

router.post('/update/:id', function(req, res) {
    sortie.update(req, res);
});
router.post('/add/:user_id', function(req, res) {
	sortie.add(req, res);
})
router.get('/delete/:user_id', function(req, res, next) {
    sortie.delete(req, res);
});

module.exports = router;
