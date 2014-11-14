var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;


router.get('/:userName/:userEmail', function(req, res) {
        function getUserName(connection, userName) {
                var deferred = Q.defer();
                query = "SELECT * from users where userName = '" + userName + "'";
                connection.query(query ,function(err,row)     {
                    if(err) {
                        deferred.reject(err);
                    } else if (row.length > 0){
                        deferred.reject(userName + " found\n");
                    } else {
                        deferred.resolve(userName + " not found\n");
                    }
                });
                 return deferred.promise;
        }

        function getUserEmail(connection, userEmail, result) {
                            if (result){
                                res.write(result);
                            }
                            console.log(userEmail);
                            var deferred = Q.defer();
                            query = "SELECT * from users where userEmail = '" + userEmail + "'";
                            console.log(query);
                            connection.query(query ,function(err,row )     {
                                if(err) {
                                    deferred.reject(err.toString());
                                } else if (row.length > 0){
                                    deferred.reject(userEmail + " found\n");
                                } else {
                                    deferred.resolve(userEmail + " not found\n");
                                }
                            });
                            return deferred.promise;
        }

        req.getConnection(function(err,connection){
                if (err) {
                    res.status(500).send(err);
                } else {
                      //promises
                      res.setHeader("Content-type", "text/plain");
                      getUserName(connection, req.params["userName"]).then(function(result){
                        getUserEmail(connection, req.params["userEmail"], result).then(function(result){
                                res.write(result);
                                res.write("combination is valid");
                                res.status(200).send();
                            }).fail(function(error){
                                res.write(error);
                                res.write("no further validations");
                                res.status(500).send();
                              })
                        }).fail(function(error){
                                res.write(error);
                                res.write("no further validations");
                                res.status(500).send();
                        });
                }
        });
});



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

    function getBets(connection, result) {
                        if (result){
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
                    if (result){
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