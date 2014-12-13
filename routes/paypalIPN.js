var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions.js')
/* POST reset password. */


router.post('/', function(req, res) {
	res.status(200).send();
//	req, res, url, data, dataCallBack, endCallBack

	params = "cmd=_notify-validate"

	for (var prop in req.body) {
        params +="&" +  prop + "=" + req.body[prop];
    }
	url = "https://www.sandbox.paypal.com/cgi-bin/webscr?" + params;
	response = "";
	functions.externalHttpPost(null, null, url, "",

	function(data){
		response += data;
	},
	function(err){
		if (err){
			console.log(err);
		} else {
			console.log(response);
		}
	});
});


module.exports = router;
