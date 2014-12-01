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

global.io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){

    socket.on('changeSocketId', function(data){
        socket.id = data.userName;
        global.clients[socket.id] = socket;
    });
    socket.on('disconnect', function(data){
        if (global.clients[socket.id])
            delete global.clients[socket.id];
    });
});





