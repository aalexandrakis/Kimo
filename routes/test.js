var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;


router.get('/', function(req, res) {
    connection = req.getConnection(function(err,connection){
        if (err)
            return err;
        return connection;
    })

var getDraws = function () {
        var deferred = Q.defer();
        req.getConnection(function(err,connection){
        		query = "SELECT * from draw";
        		connection.query(query ,function(err,row)     {
        			if(err) {
        				deferred.reject(err);
        				return deferred.promise;
        			} else {
        			    console.log("here");
//        			    deferred.resolve(row.length.toString() + " draws found\n");
        			    deferred.resolve("test 1");
        			    return deferred.promise;
        			}

        		});

        });


}
var getBets = function (result) {
        console.log(result);
        var deferred = Q.defer();
        req.getConnection(function(err,connection){
        		query = "SELECT * from bets_archive";
        		connection.query(query ,function(err,row)     {
        			if(err) {
        				deferred.reject(err);
        				return deferred.promise;
        			} else {
        			    console.log("and here");
//        			    deferred.resolve(row.length.toString() + " bets found\n");
                         deferred.resolve("test 2");
        			    return deferred.promise;
        			}

        		});

        });

}
var getUsers = function (result) {
        console.log(result);
        var deferred = Q.defer();
        req.getConnection(function(err,connection){
        		query = "SELECT * from users";
        		connection.query(query ,function(err,row)     {
        			if(err) {
        				deferred.reject(err);
        				return deferred.promise;
        			} else {
        			    console.log("here to");
//        			    deferred.resolve(row.length.toString() + " bets found\n");
                        deferred.resolve("test 3");
        			    return deferred.promise;
        			}

        		});

        });

}


    getDraws().then(getBets().then(getUsers().then(console.log("end"))));

});

router.get('/:paramvalue', function(req, res) {
    console.log("test with parameters");
    res.send("you are in test page with " + req.params["paramvalue"]);
//      res.send(req.param);
});
module.exports = router;