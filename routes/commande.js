
let express = require('express');
let router = express.Router();
let commande = require("../controllers/commandeController.js");


router.get('/list/:user_id', function(req, res) {
    commande.list(req, res);
});
router.get('/getOne/:id', function(req, res) {
	commande.getOne(req, res);
})

router.get('/listForClient/:user_id/:client_id', function(req, res) {
	commande.listForClient(req, res);
})

router.get('/show/:id', function(req, res) {
    commande.show(req, res);
});

router.post('/save', function(req, res) {
    commande.save(req, res);
});

router.post('/update/:id', function(req, res) {
    commande.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    commande.delete(req, res);
});

module.exports = router;
