kimoApp.controller("ViewDrawsController", function viewDrawsController($scope, $http, $cookieStore){
    $scope.title = "Kimo -  View Draws";
    $scope.header = "View Draws";
    $scope.tableStyle = {"display" : "none"};
    $scope.numHeaders = [];
    $scope.errorMessage = "";
    $scope.errorStyle = {"display" : "none"};
    $scope.lazyLoadStyle = {"display" : "none"};
//    for (i=0; i < 20; i++){
//        $scope.numHeaders.push("No" + (i+1));
//    };

    check = function(){
            console.log("in check function");
            if ($scope.dateFrom && $scope.dateTo){
                console.log("check function return true");
                return true;
            } else {
                $scope.errorStyle = {"display":"block"};
                $scope.errorMessage = "You must fill both dates";
                console.log("check function return false");
                return false;
            }
    };

    $scope.getDraws = function(){
        console.log("in getdraws function" + $scope.dateFrom + " - " + $scope.dateTo);
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};

        if (check()){
            $scope.lazyLoadStyle = {"display" : "block"};
            url = '/viewDraws/' + $scope.dateFrom.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "") + "/" + $scope.dateTo.replace(/-/g, "").replace(/:/g, "").replace(/ /, "");
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
                            $scope.draws = response.data;
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




