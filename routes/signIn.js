var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
/* POST login. */
router.post('/', function(req, res) {
        /////////////////////////////////////////
  		querystring = require('querystring');
  		crypto = require('crypto');
      	shasum = crypto.createHash('sha1');
  		shasum.update(req.body.password);
  		postResult = "";
  		url = '/KimoWebServices/rest/KimoRest/login';
  		data = querystring.stringify({'userName' : req.body.userName, 'password' : shasum.digest('hex'), 'regId': ''});
  		functions.httpPost(req, res, url, data, function(result){
  			postResult += result;
  		}, function(result){
  			postResult = JSON.parse(postResult);
  			if (postResult.userName){
  				res.send(postResult);
  			} else if (postResult.responseCode){
  				res.render('error',  {message: postResult.responseDescr, status: postResult.responseCode});
  			} else {
  			    res.render('error',  {message: "The request could not reach the server. Please try later", status: "408"});
  			}

  		});
      }
);
module.exports = router;
