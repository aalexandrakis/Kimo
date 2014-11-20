kimoApp.controller("ResetPasswordController", function resetPasswordController($scope, $cookieStore, $window, $http){
     $scope.title = "Kimo -  Reset Password";
     $scope.formHeader = "Reset Password";

     $scope.userEmailGroup = ["form-group"];
     $scope.userEmail = "";
     $scope.userEmailError = "";

     $scope.errorMessage = "";
     $scope.errorMessageGroup = {"display":"none"};
     $scope.successMessageGroup = {"display":"none"};

     $scope.resetPassword = function(){

          $scope.errorMessageGroup = {"display":"none"};
          $scope.successMessageGroup = {"display":"none"};
          if(!check()){

               $http({
                 url: '/resetPassword',
                 method: "POST",
                 data: {'email' : $scope.userEmail}
               })
               .then(function(response) {
                        if (response.data.responseCode != "00"){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.responseDescr;
                        } else {
                            $scope.errorMessageGroup = {"display":"none"};
                            $scope.successMessageGroup = {"display":"block"};
                        }

                  },
                  function(response) { // optional
                      // failed
                    $scope.errorMessageGroup = {"display":"block"};
                    $scope.errorMessage = "The request could not reach the server. Please try again later";
                  }
              );
          }
     };

     check = function(){
        isError = false;
        if ($scope.userEmail == ""){
           $scope.userEmailError = "You must type your email";
           $scope.userEmailGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.userEmailError = "";
           $scope.userEmailGroup = ["form-group"];
        }

        return isError;
     };
});






