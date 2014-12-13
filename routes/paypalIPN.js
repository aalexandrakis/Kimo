var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions.js')
var qs = require('querystring');
/* POST reset password. */


router.post('/', function(req, res) {
	res.status(200).send();
//	req, res, url, data, dataCallBack, endCallBack

	params = "cmd=_notify-validate"

	for (var prop in req.body) {
        params +="&" +  prop + "=" + req.body[prop];
    }
    params = qs.stringify(params);
    console.log(params);
	response = "";
	http = require('http');
    		options = {
    		    host : "www.sandbox.paypal.com",
    		    path : "/cgi-bin/webscr",
    		    method: 'POST',
    		    headers: {
    		        'Content-Type': 'application/x-www-form-urlencoded',
    		        'Content-Length': Buffer.byteLength(params)
    		    }
    		};
    		newReq = http.request(options, function(newRes) {
    			newRes.setEncoding('utf8');
    			newRes.on('data', function (result) {
					response += data;
    		    });
    			newRes.on('end', function (result) {
    				console.log(response);
    		    });
    		});
    		newReq.on('error', function(error){
    //			res.redirect('/error/408');
    			console.log(error);
    		});
    		newReq.write(params);
    		newReq.end();
});


module.exports = router;
