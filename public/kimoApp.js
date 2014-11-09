var kimoApp = angular.module("kimoApp", ['ngRoute']);

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
        });

    $routeProvider.otherwise({"redirectTo": "/signIn"});  //.otherwise("/"); //does not work
});

