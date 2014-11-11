kimoApp.controller("InfoController", function headersController($scope, $http, $cookieStore){
      $scope.isLoggedOn = function(){
          if ($cookieStore.get("user")){
             console.log("is logged on");
             return true;
          } else {
             console.log("is not logged on");
             return false;
          }
      };
});






