kimoApp.controller("ViewOldBetsController", function viewOldBetsController($scope, $http, $cookieStore){
    $scope.title = "Kimo - View Old Bets";
    $scope.header = "View Old Bets";
    $scope.tableStyle = {"display" : "none"};
    $scope.numHeaders = [];
    $scope.errorMessage = "";
    $scope.errorStyle = {"display" : "none"};
    $scope.lazyLoadStyle = {"display" : "none"};

    //TODO this method not working properly
    //TODO remove replace from betDateTime
    $scope.matched = function(betNumber, drawNumbers){
         if (betNumber == 0){
            return {};
         }
         drawNumbers = drawNumbers.split(",");
         for (i = 0; i < drawNumbers.length; i++){
            if (betNumber == +drawNumbers[i]){
                return {'background-color': 'green', 'color': 'white'};
            }
         }
         return {};
    }

    check = function(){
            if ($scope.dateFrom && $scope.dateTo){
                return true;
            } else {
                $scope.errorStyle = {"display":"block"};
                $scope.errorMessage = "You must fill both dates";
                return false;
            }
    };

    $scope.getOldBets = function(){
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};

        if (check()){
            $scope.lazyLoadStyle = {"display" : "block"};
            url = '/viewOldBets/' + $scope.dateFrom.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "") + "/" + $scope.dateTo.replace(/-/g, "").replace(/:/g, "").replace(/ /, "");
            $http({
                 url: url,
                 method: "GET",
                 headers: {Authorization: $cookieStore.get("user").token},
               })
               .then(
                  function(response) {
                        $scope.lazyLoadStyle = {"display" : "none"};
                        if (response.data.message){
                            $scope.errorStyle = {"display":"block"};
                            $scope.errorMessage = response.data.message;
                        } else {
                            $scope.tableStyle = {"display":"block"};
                            $scope.bets = response.data.bets;
                            $scope.bets.forEach(function(bet){
                                bet.betDateTime = fromIsoToEuro(new Date(bet.betDateTime));
                            });
                        }

                  },
                  function(response) { // optional
                      // failed
                    $scope.lazyLoadStyle = {"display" : "none"};
                    $scope.tableStyle = {"display":"block"};
                    $scope.errorMessage = "The request could not reach the server. Please try again later";
                  }
            );
        }
    };

});




