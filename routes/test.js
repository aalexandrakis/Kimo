var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("you are in test page");
});

router.get('/:paramvalue', function(req, res) {
    console.log("test with parameters");
    res.send("you are in test page with " + req.params["paramvalue"]);
//      res.send(req.param);
});
module.exports = router;