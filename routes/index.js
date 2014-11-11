var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
	res.redirect('index.html');
});

router.get('/', function(req, res){
    res.redirect('index.html');
});
module.exports = router;