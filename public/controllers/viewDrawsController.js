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
            if ($scope.dateFrom && $scope.dateTo){
                return true;
            } else {
                $scope.errorStyle = {"display":"block"};
                $scope.errorMessage = "You must fill both dates";
                return false;
            }
    };

    $scope.getDraws = function(){
        $scope.tableStyle = {"display":"none"};
        $scope.errorStyle = {"display":"none"};

        if (check()){
            $scope.lazyLoadStyle = {"display" : "block"};
            url = '/viewDraws/' + $scope.dateFrom.replace(/-/g, "").replace(/:/g, "").replace(/ /g, "") + "/" + $scope.dateTo.replace(/-/g, "").replace(/:/g, "").replace(/ /, "");
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
                            $scope.draws = response.data.draws;
                            $scope.draws.forEach(function(draw){
                                draw.drawDateTime = fromIsoToEuro(new Date(draw.drawDateTime));
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




