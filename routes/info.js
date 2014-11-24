var express = require('express');
var router = express.Router();
var Q = require('q');


router.get('/:userId', function(req, res) {

    req.getConnection(function(err,connection){

        //get next draw
        getNextDraw = function (connection){
        	result = {};
        	df = new Q.defer();
			query = "SELECT nextDraw from next_draw";
			connection.query(query ,function(err,nextDrawRow)     {
				if(err){
					console.error("Error Selecting next draw: %s " + err );
					result.nextDraw = "could not retrieve next draw date";
					df.resolve(result);
				} else {
					if (nextDrawRow.length > 0){
						result.nextDraw = nextDrawRow[0].nextDraw;
					} else {
						result.nextDraw = "";
					}
					df.resolve(result);
				}
			});
			return df.promise;
		}

		//get user info if user is logged in
		getUserInfo = function(connection, result){
			df = new Q.defer();
			if (req.params['userId'] != 0){
				query = "SELECT * from users where userId = " + req.params['userId'];
				connection.query(query ,function(err,userRow)     {
				if(err){
						console.error("Error Selecting user info: %s " + err );
						result.userCoins = "could not retrieve user coins";
						df.resolve(result);
					} else {
						req.user = userRow[0];
						result.userCoins = userRow[0].userCoins;
						df.resolve(result);
					}
				});
			} else {
				result.userCoins = 0;
				df.resolve(result);
			}
			return df.promise;
		}
		//get last draw
		getLastDraw = function(connection, result){
			df = new Q.defer();
			query = "SELECT * from draw order by drawDateTime DESC LIMIT 1";
			connection.query(query ,function(err,lastDrawRow)     {
				if(err){
					console.error("Error Selecting last draw info: %s " + err );
					result.lastDraw = "could not retrieve last draw";
					df.resolve(result);
				} else {
					result.lastDraw = lastDrawRow[0];
					df.resolve(result);
				}
			});
			return df.promise;
		}

		//get unNotified draws
		getUnNotifiedBets = function(connection, result, userId){
			df = new Q.defer();
			query = "SELECT * from bets_archive where notified = 0 and userId = " + userId + " order by betDateTime DESC";
			connection.query(query ,function(err,unNotifiedBets)     {
				if(err){
					console.error("Error Selecting unnotified draws : %s " + err );
					result.unNotifiedBets = "could not retrieve unNotified draws";
					df.resolve(result);
				} else {
					result.unNotifiedBets = unNotifiedBets;
					df.resolve(result);
				}
			});
			return df.promise;
		}

		Q().then(function(result){
			return getNextDraw(connection, result);
		}).then(function(result){
			return getUserInfo(connection, result);
		}).then(function(result){
			return getLastDraw(connection, result);
		}).then(function(result){
			return getUnNotifiedBets(connection, result, req.user ? req.user.userId : 0);
		}).then(function(result){
			res.send(result);
		}).catch( function(error){
			console.error(error);
			res.send({
				"nextDraw" : "Could not retrieve next draw date",
				"userCoins": "Could not retrieve user coins",
				"lastDraw" : "Could not retrieve last draw",
				"unNotifiedBets" : "Could not retrieve un notified draws"
			});
		});
	});

});


module.exports = router;