var kimoApp = angular.module("kimoApp", ['ngRoute', 'ngCookies']);

//kimoApp.factory('http', function($http){
//
//       getHttpResult =  function(method, route, data) {
//                         return $http({
//                          url: route,
//                          method: method,
//                          data: data
//                        })
//                    };
//
//       return getHttpResult;
//});


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
        .when("/viewDraws",{
            controller: "ViewDrawsController",
            templateUrl: "viewDraws.html"
        })
        .when("/viewOldBets",{
            controller: "ViewOldBetsController",
            templateUrl: "viewOldBets.html"
        })
        .when("/playNow",{
            controller: "PlayNowController",
            templateUrl: "playNow.html"
        })
        .when("/viewActiveBets",{
            controller: "ViewActiveBetsController",
            templateUrl: "viewActiveBets.html"
        })
        .when("/test",{
            controller: "MainController",
            templateUrl: "test.html"
        });

    $routeProvider.otherwise({"redirectTo": "/index"});  //.otherwise("/"); //does not work
});

