kimoApp.controller("SignInController", function signInController($scope){
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
        if ($scope.userName == ""){
           console.log("username is empty");
           $scope.userNameError = "You must type your user name";
           $scope.userNameGroup = ["form-group", "has-error"];
        } else {
           $scope.userNameError = "";
           $scope.userNameGroup = ["form-group"];
        }

        if ($scope.password == ""){
           console.log("password is empty");
           $scope.passwordError = "You must type your password";
           $scope.passwordGroup = ["form-group", "has-error"];
        } else {
           $scope.passwordError = "";
           $scope.passwordGroup = ["form-group"];
        }
     };
});






