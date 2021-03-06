kimoApp.controller("ViewUnNotifiedController", function viewUnNotifiedController($scope, $http, $cookieStore){
    $scope.title = "Kimo - View Old Bets";
    $scope.header = "View My Bets";
    $scope.tableStyle = {"display" : "none"};
    $scope.numHeaders = [];
    $scope.errorMessage = "";
    $scope.errorStyle = {"display" : "none"};
    $scope.lazyLoadStyle = {"display" : "none"};

    $scope.matched = function(betNumber, drawNumbers){
         if (betNumber == 0){
            return {};
         }
         drawNumbers = drawNumbers.split(",");
         for (i = 0; i < drawNumbers.length; i++){
            if (betNumber == drawNumbers[i]){
                return {'background-color': 'green', 'color': 'white'};
            }
         }
         return {};
    }

    getOldBets();
    function getOldBets(){
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};


            $scope.lazyLoadStyle = {"display" : "block"};
            url = '/viewOldBets/unNotifiedBets';
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
                        } else {
                            $scope.tableStyle = {"display":"block"};
                            $scope.bets = response.data.bets;
                            $scope.bets.forEach(function(bet){
                                bet.betDateTime = fromIsoToEuro(bet.betDateTime);
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
    };

});




