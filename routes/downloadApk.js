var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/', function(req, res) {
    res.download(__dirname + "/KiMobile.apk");
});

module.exports = router;