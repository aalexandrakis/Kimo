var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();

//check if the route needs authorization
var noNeedsAutorization = function(url){
	var noNeedAuthotizationUrls = ['/signIn', '/signUp', '/signOut', '/resetPassword', '/error', '/index', '/info', '/favicon.ico'];
	    //test routes
	    noNeedAuthotizationUrls +=  ['/callback', '/promise', '/test', '/nested_chained_promises'];
	for (var i = 0; i < noNeedAuthotizationUrls.length ; i++) {
        if (url.slice(0, noNeedAuthotizationUrls[i].length) == noNeedAuthotizationUrls[i]){
     	  return true;
        }
    }
    return false;
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: '9834306712alexik'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//if the route needs authorization and is not authorized redirects him to signIn route
app.use(function (req, res, next) {
    console.log("In check authorization middlewre " + (!req.session.user ? "NOT AUTHORIZED" : "AUTHORIZED USER " + req.session.user.userName))
    if (noNeedsAutorization(req.url) == false && !req.session.user) {
        res.render('error', {status: "401", message: "You do not have the authority to visit this page."});
  	} else {
  	     console.log("In check authorization middlewre next");
         next();
  	}
});

app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'kimo',
        password : 'kimo',
        port : 3306, //port mysql
        database:'kimo'
    },'request')
);//route index, hello world

require('./routes/routes.js')(app);

app.get('/', function(req, res){
    res.sendFile(path.resolve() +"/public/partials/index.html");
});

//catch 404 and forward to error handler
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  err.message = "The requested url '" + req.url + "' not found";
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            status: err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status
    });
});


module.exports = app;
