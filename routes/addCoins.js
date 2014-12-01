var express = require('express');
var router = express.Router();
var Q = require('q');
var connection;

router.put('/', function(req, res) {
    if(req.user != null){
        req.getConnection(function(err, connection){
            if(err)
                res.status(500).send({status:500, message: "Internal error.Try again"});
            query = "update users set ?";
            data = {userCoins: req.body.userCoins};
            connection.query(query, data, function(err, result){
                  //TODO implement this when paypal function added
//                socket = global.clients[req.body.userName];
//                if (socket != null){
//                    socket.emit("coinsAdded", "");
//                }
                res.status(200);
            });
        });
        res.status(200).send();
    } else {
        res.status(401);
    }
});

module.exports = router;
