var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;


router.get('/', function(req, res) {


function getDraws() {

        		return req.getConnection(function(err,connection){
        			var deferred = Q.defer();
        			query = "SELECT * from draw";
					connection.query(query ,function(err,row)     {
						if(err) {
							deferred.reject(err);
						} else {
							console.log("here");
							deferred.resolve(row.length + " draws found\n");
						}
						return deferred.promise;
					});

				});
}
var getBets = function (result) {
				console.log(result);

        		return req.getConnection(function(err,connection){
					var deferred = Q.defer();
        			query = "SELECT * from bets_archive";
					connection.query(query ,function(err,row )     {

						if(err) {
							deferred.reject(err);
						} else {
							deferred.resolve(row.length + " bets found\n");
						}
						return deferred.promise;
					});

				});
}
var getUsers = function (result) {
				console.log(result);

        		return req.getConnection(function(err,connection){
					var deferred = Q.defer();
        			query = "SELECT * from users";
					connection.query(query ,function(err,row)     {
						if(err) {
							deferred.reject(err);
						} else {
	        			    deferred.resolve(row.length + " bets found\n");
						}
						return deferred.promise;
					});

				});
}

//req.getConnection(function(err,connection){
//        if (err)
//            return err;
//
//});

//getDraws().then(getBets().then(getUsers().then(function(result){
//        	console.log(result);
//        	res.status(200).send("ok");
//        })));
getDraws().then(console.log);
res.send("ok");

});

router.get('/:paramvalue', function(req, res) {
    console.log("test with parameters");
    res.send("you are in test page with " + req.params["paramvalue"]);
//      res.send(req.param);
});
module.exports = router;