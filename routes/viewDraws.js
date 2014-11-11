
var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
   getResult = "";
   dataCallBack = function(result){
	   	    getResult += result;
		  
   }
   endCallBack = function(result){
	   	  getResult = JSON.parse(getResult);
	   	  if (getResult.responseCode){
	        res.send({"status" : getResult.responseCode , "message": getResult.responseDescr});
	      } else {
	    	if (getResult.draws.length == 0) {
	    		res.send({"message":"No draws found for the selected period"});
	    	} else {
	    		res.send(getResult.draws);
	    	}
	      }
   }

   url = '/KimoWebServices/rest/KimoRest/getDrawsByPeriod/' + req.body.dateFrom.replace(/-/g, "").replace(/ /g, "").replace(/:/g, "") + "/" +
             req.body.dateTo.replace(/-/g, "").replace(/ /g, "").replace(/:/g, "");
   functions.httpGet(req, res, url, data, dataCallBack, endCallBack);

});

router.get('/', function(req, res){
    res.redirect('viewDraws.html');
});

module.exports = router;

