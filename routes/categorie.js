
let express = require('express');
let router = express.Router();
let categorie = require("../controllers/categorieController.js");


router.get('/list/:user_id', function(req, res) {
    categorie.list(req, res);
});

router.get('/show/:id', function(req, res) {
    categorie.show(req, res);
});

router.post('/save', function(req, res) {
    categorie.save(req, res);
});

router.post('/update/:id', function(req, res) {
    categorie.update(req, res);
});

router.post('/delete/:user_id', function(req, res, next) {
    categorie.delete(req, res);
});

router.post('/add/:user_id', function(req, res) {
	categorie.add(req, res);
})
router.post('/addMany/:user_id', function(req, res) {
	categorie.addMany(req, res);
})
module.exports = router;
