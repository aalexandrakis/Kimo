#!/usr/bin/env node
var debug = require('debug')('KimoWebSiteAngular');
var app = require('../app');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

//server.listen(server_port, server_ip_address, function() {
//  debug('Express server listening on port ' + server.address().port);
//});
console.log(server_ip_address, ":", server_port);
var server = app.listen(server_port, server_ip_address, function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});
