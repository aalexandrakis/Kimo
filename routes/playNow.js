var express = require('express');
var router = express.Router();
var Q = require('q');


router.post('/', function(req, res) {
    bet = {
        betDateTime: req.body.betDateTime,
        userId: req.body.userId,
        repeatedDraws: req.body.repeatedDraws,
        randomChoice: req.body.randomChoice,
        gameType: req.body.gameType,
        betCoins: req.body.betCoins,
        multiplier: req.body.multiplier,
        betNumber1  : req.body.betNumber1,
        betNumber2  : req.body.betNumber2,
        betNumber3  : req.body.betNumber3,
        betNumber4  : req.body.betNumber4,
        betNumber5  : req.body.betNumber5,
        betNumber6  : req.body.betNumber6,
        betNumber7  : req.body.betNumber7,
        betNumber8  : req.body.betNumber8,
        betNumber9  : req.body.betNumber9,
        betNumber10  : req.body.betNumber10,
        betNumber11  : req.body.betNumber11,
        betNumber12  : req.body.betNumber12,
        drawTimeStamp : null
    };
    req.getConnection(function(err,connection){
        if(err){
            res.send({status:"950", message:"You cannot connect to kimo right now. Please tyr later."});
        } else {
           connection.beginTransaction(function(err){
                if (err){
                    res.send({status:"950", message:"Save transaction cannot began"});
                } else {
                   function saveBet(bet){
                       df = Q.defer();
                       query = "INSERT into active_bets SET ?";
                       connection.query(query, bet, function(err, results){
                            if (err){
                                error = new Error();
                                error.status = "960";
                                error.message = "Error trying to save the bet :" + err;
                                df.reject(error);
                            } else {
                                df.resolve(results);
                            }
                       });
                       return df.promise;
                   }
                   function subCoins(betCoins, userId){
                       df = Q.defer();
                       query = "UPDATE users set userCoins = userCoins - " + betCoins + " where userId = " + userId;
                       connection.query(query, function(err, results){
                            if (err){
                                error = new Error();
                                error.status = "960";
                                error.message = "Error trying to subtract betCoins from user account:" + err;
                                df.reject(error);
                            } else {
                                df.resolve(results);
                            }
                       });
                       return df.promise;
                   }
                   function commitTransaction(user){
                       df = Q.defer();
                       connection.commit(function(err) {
                           if (err) {
                               connection.rollback(function() {
                                  df.reject(err);
                               });
                           } else {
                              df.resolve(user);
                           }
                         });
                       return df.promise;
                   }

                   Q().then(function(result){
                        return saveBet(bet);
                    }).then(function(result){
                        return subCoins(req.body.betCoins, req.body.userId);
                    }).then(function(user){
                        return commitTransaction(user);
                    }).then(function(user){
//                        req.user = user;
                        res.send({status:"00", user: req.user});
                    }).catch(function(error){
                        res.send({status: error.status, message: error.message});
                    });
                }
           });
        }
   });
});


module.exports = router;