kimoApp.controller("PlayNowController", function playController($scope, $http, $cookieStore, $window, $rootScope){
    $scope.title = "Kimo - Play Now";
    $scope.numbers = [];
    $scope.selectedNumbers = [];
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
        if ($scope.selectedNumbers.indexOf(number) > -1){
            return selectedClass;
        } else {
            return unSelectedClass;
        }
    }

    $scope.clicked = function(number){
        indexOf = $scope.selectedNumbers.indexOf(number);
        if (indexOf > -1){
            $scope.selectedNumbers.splice(indexOf, 1);
            $scope.currentNumberClass =  unSelectedClass;
        } else {
            $scope.selectedNumbers.push(number);
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

        if ($scope.selectedNumbers > 12){
            errorExists = true;
        }

        if ($scope.cost > $cookieStore.get("user").userCoins){
            errorExists = true;
            $scope.errorMessage = "Your coins are not enough to play this bet.";
            $scope.errorMessageGroup = {"display":"block"};

        }
        if ($scope.gameType != $scope.selectedNumbers.length){
            errorExists = true;
            $scope.errorMessage = "Game Type must be the selected numbers counter";
            $scope.errorMessageGroup = {"display":"block"};
        }

        if (!errorExists){
            $http({
                  url: '/playNow',
                  method: "POST",
                  headers: {Authorization: $cookieStore.get("user").token},
                  data: { 'userId'       : $cookieStore.get("user").userId ,
                          'betDateTime'  : moment().format("YYYY-MM-DD HH:mm:ss"),
                          'repeatedDraws':  $scope.repeatedDraws,
                          'randomChoice' :  0,
                          'gameType'     :  $scope.gameType,
                          'betCoins'     :  $scope.cost,
                          'multiplier'   :  $scope.multiplier,
                          'betNumber1'   :  $scope.selectedNumbers[0] != null ? $scope.selectedNumbers[0]  : 0 ,
                          'betNumber2'   :  $scope.selectedNumbers[1] != null ? $scope.selectedNumbers[1]  : 0 ,
                          'betNumber3'   :  $scope.selectedNumbers[2] != null ? $scope.selectedNumbers[2]  : 0 ,
                          'betNumber4'   :  $scope.selectedNumbers[3] != null ? $scope.selectedNumbers[3]  : 0 ,
                          'betNumber5'   :  $scope.selectedNumbers[4] != null ? $scope.selectedNumbers[4]  : 0 ,
                          'betNumber6'   :  $scope.selectedNumbers[5] != null ? $scope.selectedNumbers[5]  : 0 ,
                          'betNumber7'   :  $scope.selectedNumbers[6] != null ? $scope.selectedNumbers[6]  : 0 ,
                          'betNumber8'   :  $scope.selectedNumbers[7] != null ? $scope.selectedNumbers[7]  : 0 ,
                          'betNumber9'   :  $scope.selectedNumbers[8] != null ? $scope.selectedNumbers[8]  : 0 ,
                          'betNumber10'  :  $scope.selectedNumbers[9] != null ? $scope.selectedNumbers[9]  : 0 ,
                          'betNumber11'  :  $scope.selectedNumbers[10] != null ? $scope.selectedNumbers[10]  : 0 ,
                          'betNumber12'  :  $scope.selectedNumbers[11] != null ? $scope.selectedNumbers[11]  : 0
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
                            $rootScope.$broadcast('getUserInfo', {});
                            jSuccess(
                                'Your bet saved successfully. Good Luck',
                                {
                                  autoHide : true, // added in v2.0
                                  TimeShown : 3000,
                                  HorizontalPosition : 'right',
                                  VerticalPosition : 'top',
                                  onCompleted : function(){ // added in v2.0
                                    $scope.selectedNumbers = [];
                                    $scope.multiplier = 1;
                                    $scope.repeatedDraws = 1;
                                    $scope.gameType = 1;
                                    window.setTimeout(function(){
//                                        window.location = 'playNow.html';

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
    }
});




