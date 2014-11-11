var express = require('express');
var router = express.Router();
/* POST logout. */
router.get('/', function(req, res){
	req.session = null;
    res.redirect('index.html');
});

module.exports = router;
