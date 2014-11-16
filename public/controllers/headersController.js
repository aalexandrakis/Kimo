kimoApp.controller("HeadersController", function headersController($rootScope, $scope, $http, $cookieStore, $window){
      $scope.isLoggedOn = function(){
          if ($cookieStore.get("user")){
             return true;
          } else {
             return false;
          }
      };

      $scope.$on('unNotifiedBets', function(event, unNotifiedBets){
        $scope.unNotifiedBets = unNotifiedBets;
      });
      $scope.noNotifications = function(){
        if (angular.isUndefined($scope.unNotifiedBets) || $scope.unNotifiedBets.length > 0){
            return false;
        } else {
            return true;
        }
      }
      $scope.signOut = function(){
          if ($scope.isLoggedOn()){
             $http({
               url: '/signOut',
               method: "POST"
           }).then(function(response){
               $cookieStore.remove("user");
               $window.location.href="#/index";
           }, function(response){
                console.log("log out failed");
           });
          }
      };
});






