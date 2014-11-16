var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/:dateFrom/:dateTo', function(req, res) {
    console.log("From ", req.params["dateFrom"], " To ", req.params["dateTo"]);

    req.getConnection(function(err,connection){
        query = "SELECT bets_archive.*, CONCAT(\"[\", " +
                      "draw.drawNumber1,\",\", draw.drawNumber2,\",\", draw.drawNumber3,\",\", draw.drawNumber4,\",\"," +
                      "draw.drawNumber5,\",\", draw.drawNumber6,\",\", draw.drawNumber7,\",\", draw.drawNumber8,\",\"," +
                      "draw.drawNumber9,\",\", draw.drawNumber10,\",\", draw.drawNumber11,\",\", draw.drawNumber12,\",\"," +
                      "draw.drawNumber13,\",\", draw.drawNumber14,\",\", draw.drawNumber15,\",\", draw.drawNumber16,\",\"," +
                      "draw.drawNumber17,\",\", draw.drawNumber18,\",\", draw.drawNumber19,\",\", draw.drawNumber20,\"]\") as drawNumbers" +
                      " FROM bets_archive inner join draw on drawDateTime = drawTimeStamp where betDateTime between \""+
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