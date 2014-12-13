var express = require('express');
var router = express.Router();
var functions = require('../public/javascripts/functions.js')
var qs = require('querystring');
//
//router.get('/:txnId', function(req, res){
//	data = {};
//	data.body = {
//		txn_id : req.params.txnId,
//		payment_status : 'COMPLETED',
//		payment_date : '2014-12-13 19:00:00',
//		mc_gross : '15.00',
//		mc_fee : '0.33',
//		custom : '10'
//	}
//		checkAndUpdatePayment(data);
//	res.status(200).send();
//});

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
					checkAndUpdatePayment(req);
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


function checkAndUpdatePayment(req){

	 var mysql = require('mysql');

	//TODO this must be change connection must be declared only in one place
	var connection = mysql.createConnection({
		  host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
		  user: process.env.MYSQL_USERNAME,
		  password : process.env.MYSQL_PASSWORD,
		  port : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306, //port mysql
		  database:'kimo'
	});

	amount = req.body.mc_gross - req.body.mc_fee;
	query = "select * from payments where txnId = '" + req.body.txn_id + "' and userId = " + req.body.custom;
	connection.query(query, function(err, result){
		if (err)
			console.log("Could not complete payment with txn_id ", req.body.txn_id , " because of the following error:" , err);
		if (result.length == 0){
			values = {
				payDateTime : req.body.payment_date,
				userId : req.body.custom,
				payKey : "",
				tranId : "",
				amount : amount,
				status : req.body.payment_status,
				txnId : req.body.txn_id,
			}
			connection.query("insert into payments set ?", values, function(err, result){
				if(err)
					console.log("Could not insert payment with txn_id ", req.body.txn_id , " for userId ", req.body.custom, "because of the following error ", err);
				updateUserCoins(connection, req, amount);
			});
		} else {
			if (result[0].status != "Completed"){
				query = "update payments set status = '" + req.body.payment_status + "' where txn_id = '" + req.body.txn_id + "' and userId = " + req.body.custom;
				connection(query, function(err, result){
					if (err)
					  console.log("Could not update payment with txn_id ", req.body.txn_id , " for userId ", req.body.custom, " to status ", req.body.payment_status, "because of the following error ", err);
					updateUserCoins(connection, req, amount);

				});
			}
		}
	});
}

function updateUserCoins(connection, req, coins){
	query = "select userName, userCoins from users where userId = " + req.body.custom;
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
