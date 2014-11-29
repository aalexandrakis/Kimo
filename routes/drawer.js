var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions');
var gcm = require('node-gcm');
/* POST login. */
router.put('/saveNextDrawDate',  function(req, res) {
		console.log("=====saving next draw date========");
		req.getConnection(function(err, connection){
			query = "UPDATE next_draw set nextDraw = '" + req.params['nextDrawString'] + "'";
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
		console.log("=====retrieving active bets========");
		req.getConnection(function(err, connection){
			if(err)
			   res.status(500).send(err);
			query = "select * ," +
            "CONCAT(betNumber1 , \", \" , betNumber2 , \", \" , betNumber3 , \", \" , betNumber4 , \", \" , betNumber5 , \", \" , betNumber6 , \", \" , " +
            " betNumber7 , \", \" , betNumber8 , \", \" , betNumber9 , \", \" , betNumber10 , \", \" , betNumber11 , \", \" , betNumber12) as betNumbers" +
            " from active_bets where betDateTime < '" + req.params['drawDateTime'] + "'";
			connection.query(query, function(err, activeBets)     {
				  if(err){
					  res.status(500).send(err);
				  } else {
					  res.status(200).send({bets:activeBets});
//					 res.status(200);
				  }
			});
		});
});

router.put('/updateBets',  function(req, res) {
		console.log("=====updating active bets========");
		req.getConnection(function(err, connection){
			if(err)
			   res.status(500).send(err);
			req.params['bets'].forEach(function(bet, index){
				delete bet.id;
				bet.drawTimeStamp = input.drawDateTime;
				query="insert into bets_archive set ?";
				connection.query(query, bet, function(err, insertResult)     {
					if(err)
						console.log("Could not insert betId " + bet.betId + " " + err);
						if (bet.returnRate != 0){
							query="select userCoins, regId from users where userId = " + bet.userId;
							connection.query(query, function(err, user)     {
								if(err)
									console.log("Could not select user coins for user" + bet.userId + " " + err);
									earnings = bet.betCoins * bet.returnRate;
									userCoins = user[0].userCoins + earnings;
									query="update users set userCoins = " + userCoins + " where userId = " + bet.userId;
									connection.query(query, function(err, userResult)     {
										if(err)
											console.log("Could not update user coins for user" + bet.userId + " " + err);
										data = {
											   "Type" : "WIN_NOTIFICATION",
											   "Draw" : input.drawDateTime,
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
									if(index + 1 == bets.length) {
										   res.status(200).send({message:"bets saved successfully"});
									}
							});
						} else {
							query="update active_bets set ? where betId = " + bet.betId;
							connection.query(query, bet, function(err, insertResult)     {
								if(err)
									console.log("Could not update betId " + bet.betId + " " + err);
									if(index + 1 == bets.length) {
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

module.exports = router;
