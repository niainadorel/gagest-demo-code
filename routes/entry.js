
let express = require('express');
let router = express.Router();
let entry = require("../controllers/entryController.js");


router.get('/list/:user_id', function(req, res) {
    entry.list(req, res);
});

router.get('/show/:id', function(req, res) {
    entry.show(req, res);
});

router.post('/save', function(req, res) {
    entry.save(req, res);
});

router.post('/update/:id', function(req, res) {
    entry.update(req, res);
});
router.post('/add/:user_id', function(req, res) {
	entry.add(req, res);
})

router.get('/delete/:user_id/:entry_id', function(req, res, next) {
    entry.delete(req, res);
});
router.post('/updateStatus/:user_id/:entry_id', function(req, res) {
	entry.updateStatus(req, res);
})

module.exports = router;
