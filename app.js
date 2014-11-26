var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var connection  = require('express-myconnection');
var mysql = require('mysql');

var fs = require('fs');
//var https = require('https');

var app = express();

//server = https.createServer({
//    cert: fs.readFileSync(__dirname + '/my.crt'),
//    key: fs.readFileSync(__dirname + '/my.key')
//    }, app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cookieSession({secret: '9834306712alexik'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(
    connection(mysql,{
        host: '127.3.55.130',
        user: 'kimo',
        password : 'kimo',
        port : 3306, //port mysql
        database:'kimo'
    },'request')
);

//app.use(function (req, res, next){
//        console.log("in the middleware");
//        var body = "";
//        req.on('data', function(chunk){
//            console.log("on data " + chunk);
//            body += chunk;
//        });
//        req.on('end', function(result){
//            req.body = body;
//            console.log("on end " + body);
//            console.log(result);
//            return next();
//        });
//});

//route index, hello world
require('./routes/routes.js')(app);

app.get('/', function(req, res){
    res.sendFile(path.resolve() +"/public/partials/index.html");
});

//catch 404 and forward to error handler
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  err.message
= "The requested url '" + req.url + "' not found";
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
