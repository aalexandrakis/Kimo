var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
/* POST login. */
router.post('/', function(req, res) {
        /////////////////////////////////////////
  		querystring = require('querystring');
//  		crypto = require('crypto');
//      	shasum = crypto.createHash('sha1');
//  		shasum.update(req.body.password);
  		postResult = "";
  		url = '/KimoWebServices/rest/KimoRest/login';
  		data = querystring.stringify({'userName' : req.body.userName, 'password' : req.body.password, 'regId': ''});
  		functions.httpPost(req, res, url, data, function(result){
  			postResult += result;
  		}, function(result){
  			postResult = JSON.parse(postResult);
  			if (Object.keys(postResult).length === 0){
  				res.send({message: "User Name or password error. Please try again", status: "900"});
  			} else if (postResult.userName){
			    req.session.user = postResult;
  				res.send(postResult);
  			} else if (postResult.responseCode){
  				res.send({message: postResult.responseDescr, status: postResult.responseCode});
  			} else {
  			    res.send({message: "The request could not reach the server. Please try later", status: "408"});
  			}

  		});
      }
);

router.get('/', function(req, res){
    res.redirect('signIn.html');
});

module.exports = router;
