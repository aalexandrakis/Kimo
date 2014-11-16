var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/:dateFrom/:dateTo', function(req, res) {
    console.log("From ", req.params["dateFrom"], " To ", req.params["dateTo"]);

    req.getConnection(function(err,connection){
        query = "SELECT *  FROM active_bets where betDateTime between \""+
                functions.fromEuroToIso(req.params["dateFrom"])+":00\" and \""+
                functions.fromEuroToIso(req.params["dateTo"])+":59\"";
//        console.log(query);
        connection.query(query ,function(err,rowsBets)     {

        if(err)
            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });

            res.send(rowsBets);

        });
    });
});

module.exports = router;