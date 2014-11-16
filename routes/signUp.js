var express = require('express');
var router = express.Router();
var Q = require('q');

router.post('/', function(req, res) {
	//check if user name exists
	function checkUserName(connection, userName){
		df = Q.defer();
    	query = "SELECT * from users where userName = '" + userName + "'";
    	connection.query(query ,function(err,userRow)     {
    		if(err) {
    			error = new Error();
    			error.status="DB-ERROR";
    			error.message="Error checking user name for duplicates : %s " + err
    			df.reject(error);
    		} else if(userRow.length > 0){
    			error = new Error();
    			error.status = "900";
    			error.message = "User Name already exists. Please try again";
    			df.reject(error);
    		} else {
    			df.resolve("User Name does not exists");
    		}
    	});
    	return df.promise;
    }

	//check if email exists
    function checkUserEmail(connection, userEmail){
    	console.log("check email " + userEmail);
    	df = Q.defer();
    	query = "SELECT * from users where userEmail = '" + userEmail + "'";
    	connection.query(query ,function(err,userRow)     {
    		if(err) {
    			error = new Error();
				error.status = "DB-ERROR";
				error.message = "Error Checking for Email duplicates : %s " + err;
				df.reject(error);
    		} else if(userRow.length > 0){
				error = new Error();
				error.status = "900";
				error.message = "User Email already exists";
				console.log(error);
				df.reject(error);
    		} else {
    			df.resolve("User Email does not exists");
    		}
    	});
    	return df.promise;
    }

	//insert user
    function insertUser(connection, newValuePairs){
		df = Q.defer();
		query = "INSERT INTO users SET ?";
		connection.query(query , newValuePairs, function(err,userRow)     {
			if(err) {
				error = new Error();
				error.status = "DB-ERROR";
				error.message = "Error Inserting User : %s " + err;
				df.reject(error);
			} else {
				df.resolve({message: "User added successfully", status: "00"});
			}
		});
		return df.promise;
    }

	newValuePairs = {
					 userName: req.body.userName,
					 userEmail: req.body.email,
					 userPassword: req.body.password
					};

    if (req.body.regId) {
		newValuePairs.regId= req.body.regId;
	}

    req.getConnection(function(err,connection){
		if(err){
			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
		} else {
			Q().then(function(result){
					return checkUserName(connection, req.body.userName);
				}).then(function(result){
					return checkUserEmail(connection, req.body.email);
				}).then(function(result){
					return insertUser(connection, newValuePairs);
				}).then(function(result){
					res.send(result);
				}).catch(function(error){
					res.send({status: error.status, message: error.message});
				});
		}
    });
});



module.exports = router;