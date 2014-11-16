kimoApp.controller("ViewActiveBetsController", function viewActiveBetsController($scope, $http, $cookieStore, $route){
    $scope.title = "Kimo -  View Active Bets";
    $scope.header = "View Active Bets";
    $scope.tableStyle = {"display" : "none"};
    $scope.errorStyle = {"display" : "none"};
    $scope.errorMessage = "";
    $scope.numHeaders = [];
    $scope.lazyLoadStyle = {"display" : "none"};

    console.log($route);
    getActiveBets();
    function getActiveBets(){
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};

        $scope.lazyLoadStyle = {"display" : "block"};
        url = '/viewActiveBets' ;
        $http({
             url: url,
             method: "GET"
           })
           .then(
              function(response) {
                    $scope.lazyLoadStyle = {"display" : "none"};
                    if (response.data.message){
                        $scope.errorStyle = {"display":"block"};
                        $scope.errorMessage = response.data.message;
                    } else {
                        $scope.tableStyle = {"display":"block"};
                        console.log(response.data);
                        $scope.bets = response.data;
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




