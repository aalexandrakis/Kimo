kimoApp.controller("IndexController", function indexController($scope, $http, $cookieStore, socket){
  //TODO refresh info every 2-5 minutes
    $scope.title = "KiMo";
    if (!angular.isUndefined($cookieStore.get("user"))){
      socket.emit('changeSocketId', {userName : $cookieStore.get("user").userName});
    }
});



