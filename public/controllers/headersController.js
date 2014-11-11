kimoApp.controller("HeadersController", function headersController($scope, $http, $cookieStore){
      $scope.signOut = function(){
          if ($cookieStore.remove("user")){
             console.log("user logged out");
             $http({
               url: '/signOut',
               method: "GET",
               data: {}
           });
          }
      };

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






