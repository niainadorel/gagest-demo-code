
let express = require('express');
let router = express.Router();
let fournisseur = require("../controllers/fournisseurController.js");


router.get('/list/:user_id', function(req, res) {
    fournisseur.list(req, res);
});
router.post('/checkLogin', function(req, res) {
	fournisseur.checkLogin(req, res);
})
router.get('/getbyid/:id', function(req, res) {
	fournisseur.getbyid(req, res);
})
router.get('/show/:user_id/:fournisseur_id', function(req, res) {
    fournisseur.show(req, res);
});

router.post('/save', function(req, res) {
    fournisseur.save(req, res);
});

router.post('/update/:id', function(req, res) {
    fournisseur.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    fournisseur.delete(req, res);
});

module.exports = router;
