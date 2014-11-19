kimoApp.controller("HeadersController", function headersController($rootScope, $scope, $http, $cookieStore, $window){
//      $scope.unNotifiedBets = [];
      $scope.isLoggedOn = function(){
          if ($cookieStore.get("user")){
             return true;
          } else {
             return false;
          }
      };

      $scope.$on('unNotifiedBets', function(event, unNotifiedBets){
        $scope.unNotifiedBets = unNotifiedBets;
        $scope.unNotifiedBets.forEach(function (bet){
            bet.betDateTime = fromIsoToEuro(new Date(bet.betDateTime));
        });
      });

      $scope.removeNotification = function(index){
        $scope.unNotifiedBets.splice(index, 1);
      }

      $scope.clearAllNotifications = function(){
        $scope.unNotifiedBets = [];
      }

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






