
let express = require('express');
let router = express.Router();
let product = require("../controllers/productController.js");


router.get('/list/:user_id', function(req, res) {
    product.list(req, res);
});
router.get('/checkQty/:user_id', function(req, res) {
    product.checkQty(req, res);
});
router.get('/getOne/:user_id/:product_id', function(req, res) {
	product.getOne(req, res);
});
router.get('/getUserProductForClient/:user_id', function(req, res) {
    product.getUserProductForClient(req, res);
})
router.get('/getUserProductByBarcode/:user_id/:barcode', function(req, res) {
    product.getUserProductByBarcode(req, res);
})

router.get('/show/:id', function(req, res) {
    product.show(req, res);
});

router.post('/save', function(req, res) {
    product.save(req, res);
});

router.post('/update/:id/:user_id', function(req, res) {
    product.update(req, res);
});
router.get('/validate/:id', function(req, res) {
    product.validate(req, res);
});


router.get('/delete/:id', function(req, res, next) {
    product.delete(req, res);
});

router.post('/deleteMany', function(req, res) {
	product.deleteMany(req, res);
});

router.post('/decreaseMany/:user_id', function(req, res) {
	product.decreaseMany(req, res);
})
router.post('/insertMany', function(req, res) {
	product.insertMany(req, res)
})


module.exports = router;
