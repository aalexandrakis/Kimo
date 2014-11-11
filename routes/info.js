var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
/*  */
router.post('/', function(req, res) {
		/////////////////////////////////////////
  		queryString = require('querystring');
  		postResult = "";
  		url = '/KimoWebServices/rest/KimoRest/getNextDrawAndUserCoins';
  		if (req.session.user){
  			data = queryString.stringify({'userId' : req.session.user.userId});
		 } else {
		 	data = queryString.stringify({'userId' : "0"});
		 }
		 functions.httpPost(req, res, url, data,
		 		function(result){
           			postResult += result;
           		},
           		function(result){
					postResult = JSON.parse(postResult);
					if (Object.keys(postResult).length === 0){
						res.send({message: "No info found", status: "100"});
					} else if (postResult.nextDraw){
						getResult = "";
						url = '/KimoWebServices/rest/KimoRest/getLastDraw';
						functions.httpGet(req, res, url, data,
						function(result){
						   getResult += result;
						}, function(result){
							getResult = JSON.parse(getResult);
							// res.send(result.draws);
							if (getResult.draws){
							  postResult.lastDraw = getResult.draws[0];
							}
							if (req.session.user){
								req.session.user.userCoins = postResult.userCoins;
							}
							console.log(postResult);
							res.send(postResult);
						});

					} else if (postResult.responseCode){
						res.send({message: postResult.responseDescr, status: postResult.responseCode});
					} else {
						res.send({message: "The request could not reach the server. Please try later", status: "408"});
					}

  				});
      }
);

module.exports = router;
