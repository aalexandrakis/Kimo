var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;


router.get('/', function(req, res) {


function getDraws(connection) {
        var deferred = Q.defer();
        query = "SELECT * from draw";
        connection.query(query ,function(err,row)     {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(row.length + " draws found\n");
            }

            });
         return deferred.promise;
}

function getBets(connection, result, error) {
				    if (error){
				        res.write(error);
                    }else {
                        res.write(result);
                    }
                    var deferred = Q.defer();
        			query = "SELECT * from bets_archive";
					connection.query(query ,function(err,row )     {

						if(err) {
							deferred.reject(err.toString());
						} else {
							deferred.resolve(row.length + " bets found\n");
						}

					});
					return deferred.promise;
}
function getUsers(connection, result, error) {
                if (error){
                    res.write(error);
                }else {
                    res.write(result);
                }
                var deferred = Q.defer();
                query = "SELECT * from users";
                connection.query(query ,function(err,row)     {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(row.length + " users found\n");
                    }
                });
                return deferred.promise;
}

fail = function (err){
    res.write(err);
}
req.getConnection(function(err,connection){
        if (err) {
            res.status(500).send(err);
        } else {
              //promises
              getDraws(connection).then(function(result){
                getBets(connection, result).then(function(result){
                    getUsers(connection, result).then(function(result){
                        res.write(result);
                        res.status(200).send();
                    }).fail(function(error){
                        res.write(error);
                        res.status(500).send();
                      })
                }).fail(function(error){
                        res.write(error);
                        res.status(500).send();
                        })
              }).fail(function(error){
                        res.write(error);
                        res.status(500).send();
              });
        }

});

});
router.get('/:paramvalue', function(req, res) {
    console.log("test with parameters");
    res.send("you are in test page with " + req.params["paramvalue"]);
//      res.send(req.param);
});
module.exports = router;