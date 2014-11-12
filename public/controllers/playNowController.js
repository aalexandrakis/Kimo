kimoApp.controller("PlayNowController", function playController($scope, $http, $cookieStore){
    $scope.title = "Play Now";
    $scope.numbers = [];
    selectedNumbers = [];
    selectedClass = ["btn", "btn-primary", "btn-circle", "btn-lg"];
    unSelectedClass = ["btn", "btn-default", "btn-circle", "btn-lg"];
    $scope.currentNumberClass = unSelectedClass;
    $scope.repeatedDraws = 1;
    $scope.multiplier = 1;
    $scope.gameType = 1;
    $scope.repeatedDrawsGroup = ["form-group"];
    $scope.multiplierGroup = ["form-group"];
    $scope.gameTypeGroup = ["form-group"];
    $scope.repeatedDrawsError = "";
    $scope.multiplierError = "";
    $scope.gameTypeError = "";

    errorExists = false;

    for (i = 0 ; i < 80 ; i++){
        $scope.numbers.push(i+1);
    }

    $scope.checkIfSelected = function(number){
        if (selectedNumbers.indexOf(number) > -1){
            return selectedClass;
        } else {
            return unSelectedClass;
        }
    }

    $scope.clicked = function(number){
        indexOf = selectedNumbers.indexOf(number);
        if (indexOf > -1){
            selectedNumbers.splice(indexOf, 1);
            $scope.currentNumberClass =  unSelectedClass;
        } else {
            selectedNumbers.push(number);
            $scope.currentNumberClass =  selectedClass;
        }
    }

    $scope.repeatedDrawsKeyUp = function(){
        if (!$scope.repeatedDraws || $scope.repeatedDraws < 1 || $scope.repeatedDraws > 20){
            $scope.repeatedDrawsGroup = ["fom-group, has-error"];
            $scope.repeatedDrawsError = "Type a value between 1 and 20";
            errorExists = true;
        } else {
            $scope.repeatedDrawsGroup = ["form-group"];
            $scope.repeatedDrawsError = "";
        }
    }
    $scope.multiplierKeyUp = function(){
        if (!$scope.multiplier || $scope.multiplier < 1 || $scope.multiplier > 20){
            $scope.multiplierGroup = ["fom-group, has-error"];
            $scope.multiplierError = "Type a value between 1 and 20";
            errorExists = true;
        } else {
            $scope.multiplierGroup = ["form-group"];
            $scope.multiplierError = "";
        }
    }
    $scope.gameTypeKeyUp = function(){
        if (!$scope.gameType || $scope.gameType < 1 || $scope.gameType > 12){
            $scope.gameTypeGroup = ["fom-group, has-error"];
            $scope.gameTypeError = "Type a value between 1 and 12";
            errorExists = true;
        } else {
            $scope.gameTypeGroup = ["form-group"];
            $scope.gameTypeError = "";
        }
    }
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




