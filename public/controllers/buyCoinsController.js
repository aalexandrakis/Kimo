kimoApp.controller("BuyCoinsController",  ['$scope', '$http', '$cookieStore', '$rootScope', function buyCoinsController($scope, $http, $cookieStore, $rootScope){

     $scope.title = "Kimo -  My account";
     $scope.formHeader = "Change your account coins for free!!!";

     $scope.coinsGroup = ["form-group"];
     $scope.coinsError = "";

     $scope.errorMessageGroup = {"display":"none"};

     $scope.buyCoins = function(){
          $scope.errorMessageGroup = {"display":"none"};
          if(!check()){
              var password = "";
              $http({
                  url: '/addCoins',
                  method: "PUT",
                  headers: {Authorization: $cookieStore.get("user").token},
                  data: { 'userId': $cookieStore.get("user").userId ,'userName' : $scope.userName , userCoins: $scope.coins}
              })
              .then(function(response) {
                        if (response.data.message){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else {
                            user = $cookieStore.get("user")
                            user.userCoins = $scope.coins;
                            $cookieStore.put("user", user);
                            $rootScope.$broadcast('getUserInfo', {});
                            jSuccess(
                                 'Your coins updated successfully',
                                 {
                                   autoHide : true, // added in v2.0
                                   TimeShown : 3000,
                                   HorizontalPosition : 'right',
                                   VerticalPosition : 'top',
                                   onCompleted : function(){ // added in v2.0
                                     window.setTimeout(function(){
                                         window.location = '/#';
                                     }, 3000)
                                 }
                            });
                        }

                  },
                  function(response) { // optional
                      // failed
                    $scope.errorMessageGroup = {"display":"block"};
                    $scope.errorMessage = "The request could not reach the server. Please try again later";
                  }
              );
//            $scope.errorMessageGroup = {"display":"block"};
//            $scope.errorMessage = "check ok";
          }
     };

     $scope.paypalPayment = function(){
          $scope.errorMessageGroup = {"display":"none"};
          console.log("paypal payment");
//          if(!check()){
//              var password = "";
//              $http({
//                  url: '/addCoins',
//                  method: "PUT",
//                  headers: {Authorization: $cookieStore.get("user").token},
//                  data: { 'userId': $cookieStore.get("user").userId ,'userName' : $scope.userName , userCoins: $scope.coins}
//              })
//              .then(function(response) {
//                        if (response.data.message){
//                            $scope.errorMessageGroup = {"display":"block"};
//                            $scope.errorMessage = response.data.message;
//                        } else {
//                            user = $cookieStore.get("user")
//                            user.userCoins = $scope.coins;
//                            $cookieStore.put("user", user);
//                            $rootScope.$broadcast('getUserInfo', {});
//                            jSuccess(
//                                 'Your coins updated successfully',
//                                 {
//                                   autoHide : true, // added in v2.0
//                                   TimeShown : 3000,
//                                   HorizontalPosition : 'right',
//                                   VerticalPosition : 'top',
//                                   onCompleted : function(){ // added in v2.0
//                                     window.setTimeout(function(){
//                                         window.location = '/#';
//                                     }, 3000)
//                                 }
//                            });
//                        }
//
//                  },
//                  function(response) { // optional
//                      // failed
//                    $scope.errorMessageGroup = {"display":"block"};
//                    $scope.errorMessage = "The request could not reach the server. Please try again later";
//                  }
//              );
//          }
     };

     check = function(){
        isError = false;
        if ($scope.coins == ""){
           $scope.coinsError = "You must type your user name";
           $scope.coinsGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.coinsError = "";
           $scope.coinsGroup = ["form-group"];
        }

        return isError;
     };
}]);








