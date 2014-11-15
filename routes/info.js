var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');

router.get('/', function(req, res) {

    req.getConnection(function(err,connection){
		result = {};
        //get next draw
        query = "SELECT nextDraw from next_draw";
        connection.query(query ,function(err,nextDrawRow)     {
        if(err)
//            res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
			console.log("Error Selecting next draw: %s " + err );
            result.nextDraw = nextDrawRow[0].nextDraw;
        });

		//get user info if user is logged in
		if (req.session.user){
			query = "SELECT * from users where userId = " + req.session.user.userId;
			connection.query(query ,function(err,userRow)     {
			if(err)
//				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
				console.log("Error Selecting user information: %s " + err );
				req.session.user = userRow[0];
				result.userCoins = userRow[0].userCoins;
			});
		} else {
			result.userCoins = 0;
		}

		//get last draw
		query = "SELECT * from draw order by drawDateTime DESC LIMIT 1";
		connection.query(query ,function(err,lastDrawRow)     {
		if(err)
//			res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
			console.log("Error Selecting last draw: %s " + err );
			result.lastDraw = lastDrawRow[0];
			res.send(result);
		});
	});

});


module.exports = router;