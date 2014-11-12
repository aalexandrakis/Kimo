var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
router.post('/', function(req, res) {
	   errorExists = false;
	   req.getConnection(function(err,connection){
	   		//check if user name exists
	   		query = "SELECT * from users where userName = '" + req.body.userName + "'";
	   		console.log(query);
    		connection.query(query ,function(err,userRow)     {
    			if(err) {
    				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
    			} else if(userRow.length > 0){
    				errorExists = true;
    				res.send({message: "User Name already exists. Please try again", status: "900"});
				}
    		});
    		//check if email exists
    		query = "SELECT * from users where userEmail = '" + req.body.email + "'";
    		console.log(query);
			connection.query(query ,function(err,userRow)     {
				if(err) {
					res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
				} else if(userRow.length > 0){
					errorExists = true;
					res.send({message: "User Email already exists. Please try again", status: "900"});
				}
			});
			if (!errorExists){
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
				console.log(query);
				connection.query(query , newValuePairs, function(err,userRow)     {
					if(err) {
						res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
					}
					res.send({message: "User added successfully", status: "00"});
				});
			}
    	});
});

router.get('/', function(req, res){
    res.redirect('signUp.html');
});
module.exports = router;