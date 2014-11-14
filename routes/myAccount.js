var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.put('/', function(req, res) {
	   errorExists = false;
	   req.getConnection(function(err,connection){
	   		if(err){
	   			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
	   		}
	   		checkUserName1(req, res, connection);
       });
});

checkUserName1 = function(req, res, connection){
	//check if user name exists
	query = "SELECT * from users where userName = '" + req.body.userName + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
		} else if(userRow.length > 0 && userRow[0].userId != req.session.user.userId){
			errorExists = true;
			res.send({message: "User Name already exists. Please try again", status: "900"});
		} else {
			checkMail1(req, res, connection);
		}
	});
}
checkMail1 = function(req, res, connection){
	//check if email exists
	query = "SELECT * from users where userEmail = '" + req.body.email + "'";
	connection.query(query ,function(err,userRow)     {
		if(err) {
			errorExists = true;
			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
		} else if(userRow.length > 0 && userRow[0].userId != req.session.user.userId){
			errorExists = true;
			res.send({message: "User Email already exists. Please try again", status: "900"});
		} else {
			updateUser(req, res, connection);
		}
	});
}

updateUser = function(req, res, connection){
		//insert user
		newValuePairs = {
						 userName: req.body.userName,
						 userEmail: req.body.email,
						 userPassword: req.body.password
						};
		if (req.body.regId) {
			newValuePairs.regId= req.body.regId;
		}
		query = "UPDATE users SET ? where userId = " + req.session.user.userId;
		connection.query(query , newValuePairs, function(err,userRow)     {
			if(err) {
				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
			} else {
				query = "select * from users where userId = " + req.session.user.userId;
                		connection.query(query , newValuePairs, function(err,userRow)     {
                			if(err) {
                				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
                			} else {
                				res.send({user: userRow[0], status: "00"});
                			}
                		});

			}
		});
}

router.get('/', function(req, res){
    res.redirect('myAccount.html');
});

module.exports = router;