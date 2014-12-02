 var socket = io.connect('#{NODEJS_HOST}');
      // Connectivity
      socket.emit('username', '#{current_user.name}');
      socket.on('reconnect', function () {
        console.log('Reconnected to the server');
        socket.emit('username', '#{current_user.name}');
      });
      socket.on('reconnecting', function () {
        console.log('Attempting to re-connect to the server');
      });
      // Custom Messages
      socket.on('bid', function(data) {
        $('#notifications').append("<div class='notifications'>" +
        "Bid: Rs." + data.amount + " for " + data.customer +
        "</div>");
});