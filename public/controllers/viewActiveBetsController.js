kimoApp.controller("ViewActiveBetsController", function viewActiveBetsController($scope, $http, $cookieStore, $route){
    $scope.title = "Kimo -  View Active Bets";
    $scope.header = "View Active Bets";
    $scope.tableStyle = {"display" : "none"};
    $scope.errorStyle = {"display" : "none"};
    $scope.errorMessage = "";
    $scope.numHeaders = [];
    $scope.lazyLoadStyle = {"display" : "none"};

    getActiveBets();
    function getActiveBets(){
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};

        $scope.lazyLoadStyle = {"display" : "block"};
        url = '/viewActiveBets' ;
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
                        $scope.bets = response.data;
                        $scope.bets.forEach(function(bet){
                            bet.betDateTime = fromIsoToEuro(new Date(bet.betDateTime));
                        });
                    }

              },
              function(response) { // optional
                  // failed
                $scope.lazyLoadStyle = {"display" : "none"};
                $scope.tableStyle = {"display":"block"};
              }
        );
    };

});




