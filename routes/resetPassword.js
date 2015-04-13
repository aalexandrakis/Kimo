var express = require('express');
var router = express.Router();
var Random = require('random-js');
// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(0, 69);
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
chars = "ABCDEFGHIJKLMNOPabcdefghijklmnop1234567890!@#$%&*qrstuvwxyzQRSTUVWXYZ";



/* POST reset password. */


router.post('/', function(req, res) {
	req.getConnection(function(err,connection){
		query = "SELECT * from users where userEmail = '" + req.body.email + "'";
		connection.query(query ,function(err,user)     {
			if(err) {
				res.send({"responseCode":"40", "responseDescr":err });
			} else if(user.length == 0){
				res.send({"responseCode":"10", "responseDescr":"This email is not registered in Kimo.Please check your spelling"});
			} else {
				newPass = "";
				for(i=0; i<9; i++){
					rndNumber = distribution(engine);
					newPass += chars.substring(rndNumber, rndNumber + 1);

					if (i==8){
						querystring = require('querystring');
						crypto = require('crypto');
						shasum = crypto.createHash('sha1');
						shasum.update(newPass);
						query = "UPDATE users set userPassword = '" + shasum.digest('hex') + "' where userEmail = '" + req.body.email + "'";
						connection.query(query, function(err, result){
							if(err)
								res.send({"responseCode":"40", "responseDescr":"An error occurred. Please try again later."});
							mailParams = {
							 from: 'KiMo',
							 to: req.body.email,
							 subject: 'Reset password',
							 text: 'Your new password is ' + newPass + ' . For your own safety sign in and change it immediately.'
						    };
							transporter.sendMail(mailParams, function(err, result){
								if(err) {
									console.log(err);
									res.send({"responseCode":"40", "responseDescr":"Your password changed but we couldn't send it to you. Please reset your password one more time"});
								}
								res.send({"responseCode":"00", "responseDescr":"Your password changed changed successfully"});
							});
						})
					}
				}
			}
		});
	});
});


module.exports = router;
