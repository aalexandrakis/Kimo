var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions.js')
/* POST reset password. */


router.post('/', function(req, res) {
	res.status(200).send();
//	req, res, url, data, dataCallBack, endCallBack

	newReq1 = {
		cmd : "_notify-validate"
	};

	if (JSON.stringify(req.body == "{}")){
		newReq = newReq1;
	} else {
		newReq = JSON.parse(JSON.stringify(newReq1)  + JSON.stringify(req.body));
	}
	response = "";
	functions.externalHttpPost(null, null, "https://www.sandbox.paypal.com/cgi-bin/webscr", JSON.stringify(newReq),

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
