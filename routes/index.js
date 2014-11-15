var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
	res.sendFile(path.resolve() +"/public/partials/index.html");
});

module.exports = router;