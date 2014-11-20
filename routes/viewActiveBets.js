var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');


router.get('/:betId', function(req, res) {
    req.getConnection(function(err,connection){
        query = "SELECT * FROM active_bets  where betId = " + req.params["betId"] +
                      " and userId = " + req.session.user.userId;
        connection.query(query ,function(err,rowsBets)     {

        if(err)
            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });

            res.send(rowsBets[0]);
        });
    });
});

router.get('/', function(req, res) {
    req.getConnection(function(err,connection){
        query = "SELECT *  FROM active_bets where userId = " + req.session.user.userId;
        console.log(query);
        connection.query(query ,function(err,rowsBets)     {

        if(err)
            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });

            res.send(rowsBets);

        });
    });
});

router.get('/userId/:userId', function(req, res) {
    req.getConnection(function(err,connection){
        query = "SELECT *  FROM active_bets where userId = " + req.params['userId'];
        console.log(query);
        connection.query(query ,function(err,rowsBets)     {

        if(err)
            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });

            res.send(rowsBets);

        });
    });
});

module.exports = router;