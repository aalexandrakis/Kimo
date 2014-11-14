var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/:userName/:userEmail', function(req, res) {
	   errorExists = false;
	   req.getConnection(function(err,connection){
	   		if(err){
	   			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
	   		}
	   		checkUserName(req, res, connection);
       });
});

checkUserName = function(req, res, connection){
	//check if user name exists
	query = "SELECT * from users where userName = '" + req.params["userName"] + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.status(500).send(err);
		} else if(userRow.length > 0){
			errorExists = true;
			res.status(500).send(req.params["userName"] + " found\n");
		} else {
		    res.write(req.params["userName"] + "not  found\n");
			checkMail(req, res, connection);
		}
	});
}

checkMail = function(req, res, connection){
	//check if email exists
	query = "SELECT * from users where userEmail = '" + req.params["userEmail"] + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.status(500).send(err);
		} else if(userRow.length > 0){
			errorExists = true;
			res.status(500).send(req.params["userEmail"]);
		} else {
		    res.write(req.params["userEmail"] + "not  found\n");
			res.status(200).send();
		}
	});
}


router.get('/:paramvalue', function(req, res) {
    console.log("test with parameters");
    res.send("you are in test page with " + req.params["paramvalue"]);
//      res.send(req.param);
});
module.exports = router;