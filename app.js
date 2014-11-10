var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var signIn = require('./routes/signIn');
var signUp = require('./routes/signUp');
var myAccount = require('./routes/myAccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/signIn', signIn);
app.use('/signUp', signUp);
app.use('/myAccount', myAccount);

app.get('/', function(req, res){
    res.redirect('signIn.html');
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
