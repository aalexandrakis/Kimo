module.exports = function(app) {

    var mysql = require('mysql');

    //TODO this must be change connection must be declared only in one place
    var connection = mysql.createConnection({
          host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
          user: process.env.MYSQL_USERNAME,
          password : process.env.MYSQL_PASSWORD,
          port : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306, //port mysql
          database:'kimo'
    });



    var passport = require('passport')
      , LocalStrategy = require('passport-local').Strategy
      , HttpBasicStrategy = require('passport-http').BasicStrategy;
    app.use(passport.initialize());
//    app.use(passport.session());

    passport.use(new LocalStrategy(verifyCredentials));

    passport.use(new HttpBasicStrategy(verifyCredentials));

    function verifyCredentials(username, password, done) {
        connection.query("Select * from users where userName = '" + username + "' and userPassword = '" + password + "'", function(err, user){
            if (err){
                done(err, null);
            }
            if (user.length == 0){
                done(null, {userId:0, message: "Your username or your password is not correct. Please try again."});
            }
            if (user.length > 0){
                done(null, user[0]);
            }

        });
    }

//    passport.serializeUser(function(user, done){
//        done(null, user.userId);
//    });
//
//    passport.deserializeUser(function(id, done){
//        connection.query("Select * from users where userId = " + id, function(err, user){
//            if (err)
//                done(err, null);
//            if (user.length == 0)
//                done(null, null);
//            if (user.length > 0)
//                done(null, user[0]);
//        });
//    });


    function checkAuthenticated(req, res, next){
        if (req.isAuthenticated()){
            return next();
        } else {
            error = new Error();
            error.status=403;
            error.message = "You are not authorized to visit the page";
            next(error);
        }
    }
    var signIn = require('./signIn');
    var signUp = require('./signUp');
    var myAccount = require('./myAccount');
    var index = require('./index');
    var signOut = require('./signOut');
    var info = require('./info');
    var viewDraws = require('./viewDraws');
    var viewOldBets = require('./viewOldBets');
    var playNow = require('./playNow');
    var viewActiveBets = require('./viewActiveBets');
    var resetPassword = require('./resetPassword');
    var drawer = require('./drawer');
    var downloadApk = require('./downloadApk');
    var addCoins = require('./addCoins');
    var paypalInstantPaymentNotification = require('./paypalInstantPaymentNotification');


    app.use('/signIn', passport.authenticate('basic', {session: false}), signIn);
    app.use('/signUp', signUp);
    app.use('/myAccount', passport.authenticate('basic', {session: false}), myAccount);
    app.use('/index', index);
    app.use('/signOut', signOut);
    app.use('/info', info);
    app.use('/viewDraws', passport.authenticate('basic', {session: false}), viewDraws);
    app.use('/viewOldBets', passport.authenticate('basic', {session: false}), viewOldBets);
    app.use('/playNow', passport.authenticate('basic', {session: false}), playNow);
    app.use('/viewActiveBets', passport.authenticate('basic', {session: false}), viewActiveBets);
    app.use('/resetPassword', resetPassword);
    app.use('/drawer', passport.authenticate('basic', {session: false}), drawer);
    app.use('/downloadApk', downloadApk);
    app.use('/addCoins', passport.authenticate('basic', {session: false}), addCoins);
    app.use('/paypalInstantPaymentNotification', paypalInstantPaymentNotification);


    //tests && examples
    var test = require('./test');
    var promise = require('../public/examples/promise');
    var callback = require('../public/examples/callback');
    var nested_chained_promises = require('../public/examples/nested_chained_promises');

    app.use('/test', test);
    app.use('/test/:params', test);
    app.use('/promise', promise);
    app.use('/promise/:userName/:userEmail', promise);
    app.use('/callback', callback);
    app.use('/callback/:userName/:userEmail', callback);
    app.use('/nested_chained_promises', nested_chained_promises);

}