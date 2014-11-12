var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("you are in forgot password page");
});

module.exports = router;