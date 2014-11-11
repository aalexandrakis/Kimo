kimoApp.controller("SignInController", function signInController($scope, $http, $cookieStore){
     $scope.title="KiMo SignIn";
     $scope.formHeader = "Sign In";

     $scope.userNameGroup = ["form-group"];
     $scope.userName = "";
     $scope.userNameError = "";

     $scope.passwordGroup = ["form-group"];
     $scope.password = "";
     $scope.passwordError = "";

     $scope.errorMessageGroup = {"display":"none"};

     $scope.login = function(){

          $scope.errorMessageGroup = {"display":"none"};
          if(!check()){

              $http({
                  url: '/signIn',
                  method: "POST",
                  data: { 'userName' : $scope.userName , "password": CryptoJS.SHA1($scope.password).toString()}
              })
              .then(function(response) {
                        if (response.data.message){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else if (!response.data.userName){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data;
                        } else {
                            $scope.errorMessageGroup = {"display":"block"};
                              $cookieStore.put("user" , response.data);
                              // TODO redirect to index.html
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

        if ($scope.password == ""){
           $scope.passwordError = "You must type your password";
           $scope.passwordGroup = ["form-group", "has-error"];
           isError = true;
        } else {
           $scope.passwordError = "";
           $scope.passwordGroup = ["form-group"];
        }

        return isError;
     };
});






