var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
var gcm = require('node-gcm');
/* POST login. */
router.put('/saveNextDrawDate',  function(req, res) {
		console.log("=====saving next draw date========");
		req.getConnection(function(err, connection){
			query = "UPDATE next_draw set nextDraw = '" + req.body['nextDrawString'] + "'";
			connection.query(query, function(err,nextDrawRow)     {
				if(err){
					res.status(500).send({message:err});
				} else {
					res.status(200).send({result:"ok"});
				}

			});
		});
});

router.post('/saveDraw',  function(req, res) {
		console.log("=====saving current draw========");
		req.getConnection(function(err, connection){
			if(err)
			   res.status(500).send(err);
			query = "INSERT into draw set ?";
			connection.query(query, req.body, function(err, newDrawResult)     {
				  if(err){
					  res.status(500).send(err);
				  } else {
					  res.status(200).send({message:'draw saved successfully'});
				  }
			});
		});
});

router.get('/retrieveActiveBets/:drawDateTime',  function(req, res) {
		console.log("=====retrieving active bets========", functions.fromEuroToIsoWithDelimiters(req.params.drawDateTime));
		req.getConnection(function(err, connection){
			if(err)
			   res.status(500).send(err);
			query = "select * ," +
            "CONCAT(betNumber1 , \", \" , betNumber2 , \", \" , betNumber3 , \", \" , betNumber4 , \", \" , betNumber5 , \", \" , betNumber6 , \", \" , " +
            " betNumber7 , \", \" , betNumber8 , \", \" , betNumber9 , \", \" , betNumber10 , \", \" , betNumber11 , \", \" , betNumber12) as betNumbers" +
            " from active_bets where betDateTime < '" + functions.fromEuroToIsoWithDelimiters(req.params.drawDateTime) + "'";
            connection.query(query, function(err, activeBets)     {
				  if(err){
					  res.status(500).send(err);
				  } else {
//				  	  res.writeHead(200, { 'Content-Type': 'application/json', 'connection': 'keep-alive'});
 					  res.status(200).send({bets:activeBets});
				  }
			});
		});
});

router.put('/updateBets',  function(req, res) {
		console.log("=====updating active bets========");
		req.getConnection(function(err, connection){
			if(err)
			   res.status(500).send(err);
			req.body.bets.forEach(function(bet, index){
				delete bet.id;
				query="insert into bets_archive set ?";
				connection.query(query, bet, function(err, insertResult)     {
					if(err)
						console.log("Could not insert betId " + bet.betId + " " + err);
						if (bet.returnRate != 0){
							query="select userCoins, regId from users where userId = " + bet.userId;
							connection.query(query, function(err, user)     {
								if(err)
									console.log("Could not select user coins for user" + bet.userId + " " + err);
								console.log("push not ",  user);
								earnings = bet.betCoins * bet.returnRate;
								userCoins = user[0].userCoins + earnings;
								query="update users set userCoins = " + userCoins + " where userId = " + bet.userId;
								connection.query(query, function(err, userResult)     {
									if(err)
										console.log("Could not update user coins for user" + bet.userId + " " + err);
									data = {
										   "Type" : "WIN_NOTIFICATION",
										   "Draw" : req.body.drawDateTime,
										   "Matches" : bet.matches,
										   "Earnings" : earnings
									}

									sendPushNotification(data, user[0].regId);
								});
							});
						}
						if (bet.repeatedDraws == bet.draws){
							query="delete from active_bets where betId = " + bet.betId;
							connection.query(query, function(err, insertResult)     {
								if(err)
									console.log("Could not delete betId " + bet.betId + " " + err);
									if(index + 1 == req.body.bets.length) {
										   res.status(200).send({message:"bets saved successfully"});
									}
							});
						} else {
							query="update active_bets set ? where betId = " + bet.betId;
							connection.query(query, bet, function(err, insertResult)     {
								if(err)
									console.log("Could not update betId " + bet.betId + " " + err);
									if(index + 1 == req.body.bets.length) {
										   res.status(200).send({message:"bets saved successfully"});
									}
							});
						}
				});

            });
		});
});

function sendPushNotification(data, regId){
	   console.log("sending push notification");
	   // or with object values
	   var message = new gcm.Message({
		   collapseKey: 'Kimo',
		   delayWhileIdle: true,
		   timeToLive: 3,
		   data: data
	   });

	   var sender = new gcm.Sender('AIzaSyA9YQF4JjDURGyadtNfzvSDe2lWPbB2XII');
	   regIds = [];
	   regIds.push(regId);
	   sender.send(message, regIds, 4, function (err, result) {
		   if(err)
			   console.log(err);
	   });
}

router.put('/saveBets',  function(req, res) {
	//TODO this validation in all routers
	if (req.user.userId == 0){
		res.status(401).send("Unauthorized");
	} else {
		req.getConnection(function(err, connection){
			if(err)
				res.status(500).send(err);
			req.body.bets.forEach(function(bet, index){
				query = "insert into active_bets set ?";
				connection.query(query, bet, function(err, result){
					if (err)
						res.status(500).send(err);
				});
			});
			res.status(200).send("Bets saved successfully");
		});
	}
});
module.exports = router;
