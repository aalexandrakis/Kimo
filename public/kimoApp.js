var kimoApp = angular.module("kimoApp", ['ngRoute', 'ngCookies']);

kimoApp.factory('SessionService', function(){
       console.log("New instance of Session service");
       var userIsAuthenticated = false;
       var user = {};

       setUserAuthenticated = function(value){
           userIsAuthenticated = value;
       };

       getUserAuthenticated = function(){
           return userIsAuthenticated;
       };

       setUser = function(value){
           console.log(value);
           user = value;
       };

       getUser = function(){
           console.log("getUser " + user);
           return user;
       };

       return {
           setUserAuthenticated: setUserAuthenticated,
           getUserAuthenticated: getUserAuthenticated,
           getUser: getUser,
           setUser: setUser
         };
});


//Do configuration and routing here
kimoApp.config(function($routeProvider){
    $routeProvider
        .when("/signIn",{
            controller: "SignInController",
            templateUrl: "signIn.html"
        })
        .when("/signUp",{
            controller: "SignUpController",
            templateUrl: "signUp.html"
        })
        .when("/myAccount",{
                    controller: "MyAccountController",
                    templateUrl: "myAccount.html"
                })
        .when("/test",{
            controller: "MainController",
            templateUrl: "test.html"
        });

    $routeProvider.otherwise({"redirectTo": "/signIn"});  //.otherwise("/"); //does not work
});

