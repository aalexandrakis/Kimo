var express = require('express');
var router = express.Router();
var Q = require('q');
var gcm = require('node-gcm');
var connection;

router.get('/', function(req, res) {
//    global.io.emit("newDraw", "new draw");
    console.log(global.clients);
    res.status(200).send();
});

router.get('/sendPushNotification/:regId', function(req, res) {
       console.log("sending push notification");
       data = {
               "Type" : "WIN_NOTIFICATION",
               "Draw" : 31-12-2014,
               "Matches" : 5,
               "Earnings" : 12
        }
       // or with object values
       var message = new gcm.Message({
           collapseKey: 'Kimo',
           delayWhileIdle: true,
           timeToLive: 3,
           data: data
       });

       var sender = new gcm.Sender('AIzaSyA9YQF4JjDURGyadtNfzvSDe2lWPbB2XII');
       regIds = [];
       regIds.push(req.params.regId);
       sender.send(message, regIds, 4, function (err, result) {
           if(err)
               console.log(err);
       });
       res.send("ok");
});

module.exports = router;
