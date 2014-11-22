var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

/* POST login. */
router.post('/',  function(req, res) {
	res.send(req.user);
});


module.exports = router;
