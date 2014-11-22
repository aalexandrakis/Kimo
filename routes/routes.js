module.exports = function(app) {

    var mysql = require('mysql');

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'kimo',
      password : 'kimo',
      port : 3306, //port mysql
      database:'kimo'
    });


    var passport = require('passport')
      , LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(
      function(username, password, done) {
            connection.query("Select * from users where userName = '" + username + "' and userPassword = '" + password + "'", function(err, user){
                if (err)
                    done(err, null);
                if (user.length == 0)
                    done(null, {userId:0, message: "Your username or your password is not correct. Please try again."});
                if (user.length > 0)
                    done(null, user[0]);
            });
      }
    ));

    passport.serializeUser(function(user, done){
        done(null, user.userId);
    });

    passport.deserializeUser(function(id, done){
        connection.query("Select * from users where userId = " + id, function(err, user){
            if (err)
                done(err, null);
            if (user.length == 0)
                done(null, null);
            if (user.length > 0)
                done(null, user[0]);
        });
    });

    function checkAuthenticated(req, res, next){
        if (req.isAuthenticated()){
            return next();
        } else {
            error = new Error();
            error.status=401;
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



    app.use('/signIn', passport.authenticate('local'), signIn);
    app.use('/signUp', signUp);
    app.use('/myAccount', checkAuthenticated, myAccount);
    app.use('/index', index);
    app.use('/signOut', checkAuthenticated, signOut);
    app.use('/info', info);
    app.use('/viewDraws', checkAuthenticated, viewDraws);
    app.use('/viewOldBets', checkAuthenticated, viewOldBets);
    app.use('/playNow', checkAuthenticated, playNow);
    app.use('/viewActiveBets', checkAuthenticated, viewActiveBets);
    app.use('/resetPassword', resetPassword);


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