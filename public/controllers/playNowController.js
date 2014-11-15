kimoApp.controller("PlayNowController", function playController($scope, $http, $cookieStore, $window){
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
    $scope.errorMessage = "";
    $scope.errorMessageGroup = {"display":"none"};
    $scope.cost = 0.5;

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
        $scope.calculateCost();
    }

    $scope.repeatedDrawsKeyUp = function(){
        if (!$scope.repeatedDraws || $scope.repeatedDraws < 1 || $scope.repeatedDraws > 20){
            $scope.repeatedDrawsGroup = ["fom-group, has-error"];
            $scope.repeatedDrawsError = "Type a value between 1 and 20";
            errorExists = true;
        } else {
            $scope.repeatedDrawsGroup = ["form-group"];
            $scope.repeatedDrawsError = "";
            $scope.calculateCost();
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
            $scope.calculateCost();
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
            $scope.calculateCost();
        }
    }

    $scope.play = function(){
        $scope.errorMessage = "";
        $scope.errorMessageGroup = {"display":"none"};
        errorExists = false;
        $scope.calculateCost();

        if (angular.isUndefined($scope.gameType) || $scope.gameType > 12 || $scope.gameType < 1){
            errorExists = true;
        }

        if (angular.isUndefined($scope.multiplier) || $scope.multiplier > 20 || $scope.multiplier < 1){
            errorExists = true;
        }

        if (angular.isUndefined($scope.repeatedDraws) || $scope.repeatedDraws > 20 || $scope.repeatedDraws < 1){
            errorExists = true;
        }

        if (selectedNumbers > 12){
            errorExists = true;
        }

        if ($scope.cost > $cookieStore.get("user").userCoins){
            errorExists = true;
            $scope.errorMessage = "Your coins are not enough to play this bet.";
            $scope.errorMessageGroup = {"display":"block"};

        }
        if ($scope.gameType != selectedNumbers.length){
            errorExists = true;
            $scope.errorMessage = "Game Type must be the selected numbers counter";
            $scope.errorMessageGroup = {"display":"block"};
        }

        if (!errorExists){
            $http({
                  url: '/playNow',
                  method: "POST",
                  data: { 'userId'       : $cookieStore.get("user").userId ,
                          'betDateTime'  : moment().format("YYYY-MM-DD hh:mm:ss"),
                          'repeatedDraws':  $scope.repeatedDraws,
                          'randomChoice' :  0,
                          'gameType'     :  $scope.gameType,
                          'betCoins'     :  $scope.cost,
                          'multiplier'   :  $scope.multiplier,
                          'betNumber1'   :  selectedNumbers[0] != null ? selectedNumbers[0]  : 0 ,
                          'betNumber2'   :  selectedNumbers[1] != null ? selectedNumbers[1]  : 0 ,
                          'betNumber3'   :  selectedNumbers[2] != null ? selectedNumbers[2]  : 0 ,
                          'betNumber4'   :  selectedNumbers[3] != null ? selectedNumbers[3]  : 0 ,
                          'betNumber5'   :  selectedNumbers[4] != null ? selectedNumbers[4]  : 0 ,
                          'betNumber6'   :  selectedNumbers[5] != null ? selectedNumbers[5]  : 0 ,
                          'betNumber7'   :  selectedNumbers[6] != null ? selectedNumbers[6]  : 0 ,
                          'betNumber8'   :  selectedNumbers[7] != null ? selectedNumbers[7]  : 0 ,
                          'betNumber9'   :  selectedNumbers[8] != null ? selectedNumbers[8]  : 0 ,
                          'betNumber10'  :  selectedNumbers[9] != null ? selectedNumbers[9]  : 0 ,
                          'betNumber11'  :  selectedNumbers[10] != null ? selectedNumbers[10]  : 0 ,
                          'betNumber12'  :  selectedNumbers[11] != null ? selectedNumbers[11]  : 0
                  }
              })
              .then(function(response) {
                        if (!response.data.status){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data;
                        } else if (response.data.status != "00"){
                            $scope.errorMessageGroup = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else {
                            jSuccess(
                                'Your bet saved successfully. Good Luck',
                                {
                                  autoHide : true, // added in v2.0
                                  TimeShown : 3000,
                                  HorizontalPosition : 'right',
                                  VerticalPosition : 'top',
                                  onCompleted : function(){ // added in v2.0
                                    window.setTimeout(function(){
                                        window.location = 'playNow.html';
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
        }

    }

    $scope.calculateCost = function (){
        $scope.cost =  $scope.repeatedDraws * $scope.multiplier * 0.50;
        console.log($scope.cost);
    }
});




