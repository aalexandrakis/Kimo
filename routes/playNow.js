var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
	res.redirect('playNow.html');
});

router.get('/', function(req, res){
    res.redirect('playNow.html');
});

module.exports = router;