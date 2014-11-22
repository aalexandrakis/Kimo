var express = require('express');
var router = express.Router();
var Q = require('q');

router.put('/', function(req, res) {
	   errorExists = false;
	   userId = req.body.userId == null ? req.user.userId : req.body.userId;

	   req.getConnection(function(err,connection){
	   		if(err){
	   			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
	   		} else {
				//check if user name exists
	   			function checkUserName(){
                	df = Q.defer();
                	query = "SELECT * from users where userName = '" + req.body.userName + "'";
                	connection.query(query ,function(err,userRow)     {
                		if(err) {
                			error = new Error();
                			error.status = "DB-ERROR";
                			error.message = "Error Selecting user name for duplicates: %s " + err ;
                			df.reject(error);
                		} else if(userRow.length > 0 && userRow[0].userId != userId){
                			error = new Error();
                			error.status = "900";
                			error.message = "User Name already exists. Please try another.";
                			df.reject(error);
                		} else {
                			df.resolve("User name accepted");
                		}
                	});
                	return df.promise;
                }

				//check if email exists
				function checkUserEmail(){
					df = Q.defer()
					query = "SELECT * from users where userEmail = '" + req.body.email + "'";
					connection.query(query ,function(err,userRow)     {
						if(err) {
							error = new Error();
							error.status = "DB-ERROR";
							error.message = "Error Selecting : %s " + err;
							df.reject(error);
						} else if(userRow.length > 0 && userRow[0].userId != userId){
							error = new Error();
							error.status = "900";
							error.message = "User Email already exists. Please try another";
							df.reject(error);
						} else {
							df.resolve("Email accepted");
						}
					});
					return df.promise;
				}

				//insert user
				function updateUser(){
					df = Q.defer();
					newValuePairs = {
									 userName: req.body.userName,
									 userEmail: req.body.email,
									 userPassword: req.body.password
									};
					if (req.body.regId) {
						newValuePairs.regId= req.body.regId;
					}
					query = "UPDATE users SET ? where userId = " + userId;
					connection.query(query , newValuePairs, function(err,userRow)     {
						if(err) {
							error = new Error();
							error.status = "DB-ERROR";
							error.message = "Error Selecting : %s " + err ;
							df.reject(error);
						} else {
							query = "select * from users where userId = " + userId;
									connection.query(query, function(err,userRow)     {
										if(err) {
											error = new Error();
											error.status = "DB-ERROR";
											error.message = "Error Selecting : %s " + err ;
											df.reject(error);
										} else {
											df.resolve({user: userRow[0], status: "00"});
										}
									});

						}
					});
					return df.promise;
				}

				Q().then(function(result){
					return checkUserName(result);
				}).then(function(result){
					return checkUserEmail(result);
				}).then(function(result){
					return updateUser(result);
				}).then(function(result){
					res.send(result);
				}).catch(function(error){
					res.send({status: error.status, message: error.message});
				});
	   		}
       });
});


module.exports = router;