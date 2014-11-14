var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;


router.get('/', function(req, res) {
    res.send("you are in test page");
});

router.get('/:paramvalue', function(req, res) {
    res.send("you are in test page with " + req.params["paramvalue"]);
});

module.exports = router;