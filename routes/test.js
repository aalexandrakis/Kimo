var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log("test route");
	res.send(req.session.user ? req.session.user : "you are not logged in");
});

module.exports = router;