var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions.js')
var qs = require('querystring');
/* POST reset password. */


router.post('/', function(req, res) {
	res.status(200).send();
//	req, res, url, data, dataCallBack, endCallBack

	params = "cmd=_notify-validate";

	for (var prop in req.body) {
        params +="&" +  prop + "=" + req.body[prop];
    }
//    params = qs.stringify(params);
    console.log("params : " , params);
	response = "";
	http = require('https');
	options = {
		host : "www.sandbox.paypal.com",
		path : "/cgi-bin/webscr",
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(params)
		}
	};
	newReq = http.request(options, function(newRes) {
		newRes.setEncoding('utf8');
		newRes.on('data', function (data) {
			console.log("data: ", data);
			response += data;
		});
		newRes.on('end', function (result) {
			if(req.body.payment_status == "Completed"){
				req.getConnection(function(err, connection){
					if(err)
						console.log("Could not complete payment with txn_id ", req.body.txn_id , " because of the following error.");
					checkAndUpdatePayment(connection, req);
				});
			}
			console.log("response: ",response);
		});
	});
	newReq.on('error', function(error){
//			res.redirect('/error/408');
		console.log("error: ", error);
	});
	newReq.write(params);
	newReq.end();
});


function checkAndUpdatePayment(connection, req){
	amount = req.body.payment.mc_gross - req.body.payment.mc_fee;
	query = "select * from payments where txnId = '" + req.body.payment.txn_id + "' and userId = " + req.body.payment.custom;
	connection.query(query, function(err, result){
		if (result.length=0){
			values = {
				payDateTime : req.body.payment_date,
				userId : req.body.custom,
				payKey : "",
				tranId : "",
				amount : req.body.amount,
				status : req.body.payment_status,
				txnId : req.body.txnId,
			}
			connection.query("insert into payments set ?", function(err, result){
				if(err)
					console.log("Could not insert payment with txn_id ", req.body.txn_id , " for userId ", req.body.custom, "because of the following error ", err);
				updateUserCoins(connection, payment.custom, amount);
			});
		} else {
			if (result[0].status != "Completed"){
				query = "update payments set ? where txn_id = '" + req.body.txn_id + "' and userId = " + req.body.custom;
				values = {
					status : req.body.payment_status
				}
				connection(query, values, function(err, result){
					if (err)
					  console.log("Could not update payment with txn_id ", req.body.txn_id , " for userId ", req.body.custom, " to status ", req.body.payment_status, "because of the following error ", err);
					updateUserCoins(connection, req, amount);

				});
			}
		}
	});
}

function updateUserCoins(connection, req, coins){
	query = "select userCoins from user where userId = " + req.body.custom;
	connection.query(query, function(err, result){
		if (err)
		  console.log("Could retrieve user information to add ", coins, " coins to userId ", req.body.custom , " because of the following error ", err);
	  	values = {
	  		userCoins : result[0].userCoins + amount
		};
	  	query="update users set ? where userId = " + req.body.custom;
	  	connection.query(query, values, function(err, result){
		if (err)
		  	console.log("Could retrieve user information to add ", coins, " coins to userId ", req.body.custom , " because of the following error ", err);
	  	});

	});
}


module.exports = router;
