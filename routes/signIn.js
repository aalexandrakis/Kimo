var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

/* POST login. */
router.post('/',  function(req, res) {
	req.user.token = req.headers.authorization;
	res.send(req.user);
});


module.exports = router;
