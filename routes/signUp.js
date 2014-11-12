var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
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
	query = "SELECT * from users where userName = '" + req.body.userName + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
		} else if(userRow.length > 0){
			errorExists = true;
			res.send({message: "User Name already exists. Please try again", status: "900"});
		} else {
			checkMail(req, res, connection);
		}
	});
}

checkMail = function(req, res, connection){
	//check if email exists
	query = "SELECT * from users where userEmail = '" + req.body.email + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
		} else if(userRow.length > 0){
			errorExists = true;
			res.send({message: "User Email already exists.", status: "900"});
		} else {
			insertUser(req, res, connection);
		}
	});
}

insertUser = function(req, res, connection){
		//insert user
		newValuePairs = {
						 userName: req.body.userName,
						 userEmail: req.body.email,
						 userPassword: req.body.password
						};
		if (req.body.regId) {
			newValuePairs.regId= req.body.regId;
		}
		query = "INSERT INTO users SET ?";
		connection.query(query , newValuePairs, function(err,userRow)     {
			if(err) {
				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
			} else {
				res.send({message: "User added successfully", status: "00"});
			}
		});
}

router.get('/', function(req, res){
    res.redirect('signUp.html');
});

module.exports = router;