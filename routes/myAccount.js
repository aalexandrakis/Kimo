var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
		querystring = require('querystring');
//		crypto = require('crypto');
//    	shasum = crypto.createHash('sha1');
//		shasum.update(req.body.password);

		url = '/KimoWebServices/rest/KimoRest/saveUser';
		data = querystring.stringify({'userIdString': req.body.userId, 'userName' : req.body.userName, 'userEmail': req.body.email, 'userPassword' : req.body.password, 'regId': ''});
		postResult = "";
		functions.httpPost(req, res, url, data,
		function(result){
			postResult += result;
		},
		function(result){
			console.log(postResult);
			postResult = JSON.parse(postResult);
			if (postResult.responseCode == "00"){
				res.send({"responseCode":postResult.responseCode, "responseMessage":"Your account updated successfully."});
			} else {
				res.send({"responseCode":postResult.responseCode, "responseMessage":postResult.responseDescr});
			}
		});
		/////////////////////////////////////
		
});

router.post('/', function(req, res){
    res.redirect('myAccount.html');
});
module.exports = router;