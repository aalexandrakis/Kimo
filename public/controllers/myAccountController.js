kimoApp.controller("MyAccountController",  ['$scope', '$http', '$cookieStore', function myAccountController($scope, $http, $cookieStore){

     $scope.title = "Kimo -  My account";
     $scope.formHeader = "My account";

     $scope.userNameGroup = ["form-group"];
     $scope.userName = $cookieStore.get("user").userName;
     $scope.userNameError = "";

     $scope.emailGroup = ["form-group"];
     $scope.email = $cookieStore.get("user").userEmail;
     $scope.emailError = "";

     $scope.newPasswordGroup = ["form-group"];
     $scope.newPassword = "";
     $scope.newPasswordError = "";

     $scope.oldPasswordGroup = ["form-group"];
     $scope.oldPassword = "";
     $scope.oldPasswordError = "";

     $scope.confirmPasswordGroup = ["form-group"];
     $scope.confirmPassword = "";
     $scope.confirmPasswordError = "";


     $scope.errorMessageGroup = {"display":"none"};

     $scope.update = function(){
          $scope.errorMessageGroup = {"display":"none"};
          if(!check()){
              var password = "";
              if ($scope.newPassword != ""){
                password = CryptoJS.SHA1($scope.newPassword).toString();
              } else {
                password = CryptoJS.SHA1($scope.oldPassword).toString();
              }
              $http({
                  url: '/myAccount',
                  method: "PUT",
                  data: { 'userId': $cookieStore.get("user").userId ,'userName' : $scope.userName , "email": $scope.email, "password": password}
              })
              .then(function(response) {
                        if (!response.data.status){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data;
                        } else if (response.data.status != "00"){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else {
                            $cookieStore.remove("user");
                            $cookieStore.put("user", response.data.user);
                            jSuccess(
                                 'Your account updated successfully',
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

        if ($scope.oldPassword == ""){
           $scope.oldPasswordError = "You must type your password";
           $scope.oldPasswordGroup = ["form-group", "has-error"];
           isError = true;
        } else {
            //password myst be the same as session password
            if (CryptoJS.SHA1($scope.oldPassword).toString() != $cookieStore.get("user").userPassword){
               $scope.oldPasswordError = "Please re-type the correct password";
               $scope.oldPasswordGroup = ["form-group", "has-error"];
               isError = true;
            } else {
               $scope.oldPasswordError = "";
               $scope.oldPasswordGroup = ["form-group"];
            }
        }



        if ($scope.newPassword != ""){
            if ($scope.confirmPassword == ""){
               $scope.confirmPasswordError = "You must type your password confirmation";
               $scope.confirmPasswordGroup = ["form-group", "has-error"];
               isError = true;
            } else {
               $scope.confirmPasswordError = "";
               $scope.confirmPasswordGroup = ["form-group"];
            }

            if ($scope.confirmPassword != $scope.newPassword){
               $scope.errorMessageGroup = {"display":"block"};
               $scope.errorMessage = "Password confirmation is error.";
               isError = true;
            } else {
               $scope.errorMessageGroup = {"display":"none"};
               $scope.errorMessage = "";
            }
        }

        return isError;
     };
}]);








