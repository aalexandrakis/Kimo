var kimoApp = angular.module("kimoApp", ['ngRoute', 'ngCookies']);

//TODO implement buy coins
kimoApp.directive('headerDirective', function() {
                  return {
                    templateUrl: "partials/headers.html",
                    controller: 'HeadersController'
                  };
       }).directive('infoDirective', function() {
                  return {
                    templateUrl: "partials/info.html",
                    controller: 'InfoController'
                  };
       });

kimoApp.run(function($rootScope, $location, $cookieStore){
    $rootScope.$on('$routeChangeStart', function(event, route){
        if (route.mustBeLoggedOn && angular.isUndefined($cookieStore.get("user"))) {
            // reload the login route
            jError(
                 'You must be logged on to visit this page',
                 {
                   autoHide : true,
                   TimeShown : 3000,
                   HorizontalPosition : 'right',
                   VerticalPosition : 'top',
                   onCompleted : function(){
                   window.location = '#/signIn';
                     window.setTimeout(function(){

                     }, 3000)
                 }
            });
        }

    });
});

kimoApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


//Do configuration and routing here
kimoApp.config(function($routeProvider){
    $routeProvider
        .when("/signIn",{
            controller: "SignInController",
            templateUrl: "partials/signIn.html",
            mustBeLoggedOn: false
        })
        .when("/signUp",{
            controller: "SignUpController",
            templateUrl: "partials/signUp.html",
            mustBeLoggedOn: false
        })
        .when("/myAccount",{
            controller: "MyAccountController",
            templateUrl: "partials/myAccount.html",
            mustBeLoggedOn: true
        })
        .when("/viewDraws",{
            controller: "ViewDrawsController",
            templateUrl: "partials/viewDraws.html",
            mustBeLoggedOn: true
        })
        .when("/viewOldBets",{
            controller: "ViewOldBetsController",
            templateUrl: "partials/viewOldBets.html",
            mustBeLoggedOn: true
        })
        .when("/viewUnNotifiedBets",{
            controller: "ViewUnNotifiedController",
            templateUrl: "partials/viewUnNotifiedBets.html",
            mustBeLoggedOn: true
        })
        .when("/viewBet/:betId/:drawNum",{
            controller: "ViewBetController",
            templateUrl: "partials/viewBet.html",
            mustBeLoggedOn: true,
            activeBet: false
        })
        .when("/viewActiveBet/:betId",{
            controller: "ViewBetController",
            templateUrl: "partials/viewBet.html",
            mustBeLoggedOn: true,
            activeBet: true
        })
        .when("/playNow",{
            controller: "PlayNowController",
            templateUrl: "partials/playNow.html",
            mustBeLoggedOn: true
        })
        .when("/viewActiveBets",{
            controller: "ViewActiveBetsController",
            templateUrl: "partials/viewActiveBets.html",
            mustBeLoggedOn: true
        })
        .when("/viewActiveBet",{
            controller: "ViewBetController",
            templateUrl: "partials/viewBet.html",
            mustBeLoggedOn: true
        }).when("/resetPassword",{
            controller: "ResetPasswordController",
            templateUrl: "partials/resetPassword.html",
            mustBeLoggedOn: false
        }).otherwise("/#");

//    $routeProvider.otherwise({"redirectTo": "/index"});  //.otherwise("/"); //does not work
});

