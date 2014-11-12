kimoApp.controller("SignUpController", function signUpController($scope, $http){
     $scope.formHeader = "Sign Up";

     $scope.userNameGroup = ["form-group"];
     $scope.userName = "";
     $scope.userNameError = "";

     $scope.emailGroup = ["form-group"];
     $scope.email = "";
     $scope.emailError = "";

     $scope.passwordGroup = ["form-group"];
     $scope.password = "";
     $scope.passwordError = "";

     $scope.confirmPasswordGroup = ["form-group"];
     $scope.confirmPassword = "";
     $scope.confirmPasswordError = "";


     $scope.errorMessageGroup = {"display":"none"};
     $scope.successMessageGroup = {"display":"none"};

     $scope.signUp = function(){
          $scope.errorMessageGroup = {"display":"none"};
          if(!check()){

              $http({
                  url: '/signUp',
                  method: "POST",
                  data: { 'userName' : $scope.userName , "email": $scope.email, "password": CryptoJS.SHA1($scope.password).toString()}
              })
              .then(function(response) {
                        console.log(response.data);
                        if (!response.data.status){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data;
                        } else if (response.data.status != "00"){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else {
                            $scope.successMessageGroup = {"display":"block"};
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

     check = function(){
        isError = false;
        if ($scope.userName == ""){
           $scope.userNameError = "You must type your user name";
           $scope.userNameGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.userNameError = "";
           $scope.userNameGroup = ["form-group"];
        }

        if ($scope.email == ""){
           $scope.emailError = "You must type your email";
           $scope.emailGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.emailError = "";
           $scope.emailGroup = ["form-group"];
        }

        if ($scope.password == ""){
           $scope.passwordError = "You must type your password";
           $scope.passwordGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.passwordError = "";
           $scope.passwordGroup = ["form-group"];
        }

        if ($scope.confirmPassword == ""){
           $scope.confirmPasswordError = "You must type your password confirmation";
           $scope.confirmPasswordGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.confirmPasswordError = "";
           $scope.confirmPasswordGroup = ["form-group"];
        }


        if ($scope.confirmPassword != $scope.password){
           $scope.errorMessageGroup = {"display":"block"};
           $scope.errorMessage = "Password confirmation is error.";
           isError = true;
        } else {
           $scope.errorMessageGroup = {"display":"none"};
           $scope.errorMessage = "";
        }
        return isError;
     };
}).directive('headerDirective', function() {
             return {
               templateUrl: "header.html",
               controller: 'HeadersController'
             };
  }).directive('infoDirective', function() {
             return {
               templateUrl: "info.html",
               controller: 'InfoController'
             };
  });






