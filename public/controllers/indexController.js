kimoApp.controller("IndexController", function indexController($scope, $http, $cookieStore){
    $scope.title = "Home Page";



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




