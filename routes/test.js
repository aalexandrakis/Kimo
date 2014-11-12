var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

req.getConnection(function(err,connection){

     connection.query('SELECT * FROM users',function(err,rows)     {

        if(err)
           console.log("Error Selecting : %s " + err );

            res.send(rows);

         });

});
});

module.exports = router;