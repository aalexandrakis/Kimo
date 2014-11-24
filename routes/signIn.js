var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

/* POST login. */
router.post('/',  function(req, res) {
	req.user.token = req.headers.authorization;
	if (req.body.regId){
		req.getConnection(function(err, connection){
			if (err)
				res.status(500).send({message:"Could not connect to the database due to the following error : " +  err});
			connection.query("update users set regId = '" + req.body.regId + "' where userId = " + req.user.userId, function(err, result){
			if (err)
				res.status(500).send({message:"Could not connect to the database due to the following error : " +  err});
			res.status(200).send(req.user).end();
			});
		});
	} else {
		res.status(200).send(req.user).end();
	}
});

module.exports = router;
