var express = require('express');
var router = express.Router();
/* POST logout. */
router.post('/', function(req, res){
	req.logout();
	res.send({"status":"OK"});
});

module.exports = router;
