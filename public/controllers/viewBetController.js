kimoApp.controller("ViewBetController", function viewBetController($scope, $http, $cookieStore, $window, $routeParams, $route){
    $scope.title = "Kimo - Play Now";
    $scope.numbers = [];
    $scope.selectedNumbers = [];
    //not played nor drawed
    defaultClass = ["btn", "btn-default", "btn-circle", "btn-lg"];
    //played but not matched
    unMatchedClass = ["btn", "btn-danger", "btn-circle", "btn-lg"];
    //played and matched
    matchedClass = ["btn", "btn-success", "btn-circle", "btn-lg"];
    //drawed only
    drawNumberClass = ["btn", "btn-primary", "btn-circle", "btn-lg"];

    $scope.repeatedDraws = 1;
    $scope.multiplier = 1;
    $scope.gameType = 1;
    $scope.cost = 0.5;

    errorExists = false;

    for (i = 0 ; i < 80 ; i++){
        $scope.numbers.push(i+1);
    }

    betNumbers = [];
    $scope.drawNumbers = [];

    $scope.getCSSClass = function(number){
        isInBet = betNumbers.indexOf(number) > -1
        isInDraw = $scope.drawNumbers.indexOf(number) > -1
        if ($scope.isActive() && isInBet){
            return drawNumberClass;
        } else if  ($scope.isActive() && !isInBet){
            return defaultClass;
        } else if (isInBet && isInDraw){
            return matchedClass;
        } else if (isInBet){
            return unMatchedClass;
        } else if (isInDraw){
            return drawNumberClass;
        } else {
            return defaultClass;
        }
    }
    $scope.isActive = function(){
        if ($route.current.$$route.activeBet){
            return true;
        } else {
            return false;
        }
    }
    function getBet(betId, drawNum){
            if ($scope.isActive()){
                url = '/viewActiveBets/' + betId;
            } else {
                url = '/viewOldBets/bet/' + betId + "/" + drawNum;
            }
            $http({
                  url: url,
                  method: "GET",
                  headers: {Authorization: $cookieStore.get("user").token},
              })
              .then(function(response) {
                        //parse the bet
                        $scope.betDateTime = fromIsoToEuro(response.data.betDateTime);
                        $scope.betId = response.data.betId;
                        $scope.drawNum = response.data.draws
                        betNumbers.push(response.data.betNumber1);
                        betNumbers.push(response.data.betNumber2);
                        betNumbers.push(response.data.betNumber3);
                        betNumbers.push(response.data.betNumber4);
                        betNumbers.push(response.data.betNumber5);
                        betNumbers.push(response.data.betNumber6);
                        betNumbers.push(response.data.betNumber7);
                        betNumbers.push(response.data.betNumber8);
                        betNumbers.push(response.data.betNumber9);
                        betNumbers.push(response.data.betNumber10);
                        betNumbers.push(response.data.betNumber11);
                        betNumbers.push(response.data.betNumber12);
                        $scope.repeatedDraws = response.data.repeatedDraws;
                        $scope.multiplier = response.data.multiplier;
                        $scope.gameType = response.data.gameType;
                        $scope.cost = response.data.betCoins;
                        if (!$scope.isActive()){
                            $scope.drawNumbers = response.data.drawNumbers.split(",");
                            $scope.drawNumbers.forEach(function(number, index){
                                   $scope.drawNumbers[index] = +number;
                            });
                            $scope.matches = response.data.matches;
                            $scope.earnings = response.data.returnRate * response.data.betCoins;
                        }
               },
              function(response) { // optional
                      // failed
                    $scope.errorMessageGroup = {"display":"block"};
                    $scope.errorMessage = "The request could not reach the server. Please try again later";
                  }
              );
        }

        if (angular.isUndefined($routeParams.drawNum)){
            getBet($routeParams.betId, null);
        } else {
            getBet($routeParams.betId, $routeParams.drawNum);
        }

});




