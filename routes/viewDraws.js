
var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/:dateFrom/:dateTo', function(req, res) {

    req.getConnection(function(err,connection){
        query = 'SELECT * FROM draw where drawDateTime between \"'+
                functions.fromEuroToIsoWithDelimiters(req.params["dateFrom"])+':00\" and \"'+
                functions.fromEuroToIsoWithDelimiters(req.params["dateTo"])+':59\"';
        connection.query(query ,function(err,rows)     {

        if(err)
            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });

            res.send(rows);
         });
    });

});

module.exports = router;

