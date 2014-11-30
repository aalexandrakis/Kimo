kimoApp.controller("InfoController", function infoController($rootScope, $scope, $http, $cookieStore, $interval, $q){
  $scope.nextDraw = "";
  $scope.lastDrawDate = "";
  $scope.alerts=[];
  if($cookieStore.get("user")){
      $scope.userCoins = $cookieStore.get("user").userCoins;
  } else {
      $scope.userCoins = 0;
  }

  $scope.removeAlert = function(index){
    $scope.alerts.splice(index, 1);
  }
  function parseData(response) {
        if (!angular.isUndefined(response.data.message)){
            console.log(response.data);
        } else if (!angular.isUndefined(response.data.nextDraw)){
            $scope.nextDraw = fromIsoToEuro(response.data.nextDraw);
            $scope.userCoins = response.data.userCoins;
            $scope.lastDrawDate = fromIsoToEuro(response.data.lastDraw.drawDateTime);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber1);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber2);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber3);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber4);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber5);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber6);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber7);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber8);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber9);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber10);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber11);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber12);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber13);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber14);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber15);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber16);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber17);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber18);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber19);
            $scope.lastDrawNumbers.push(response.data.lastDraw.drawNumber20);

            $scope.lastDrawDate = $scope.lastDrawDate;
            $scope.nextDraw = $scope.nextDraw;
            if ($cookieStore.get("user")){
                $cookieStore.get("user").userCoins = response.data.userCoins;
            }
        }
  }
  counter = 0;
  getInfoData = function(){
      $scope.lastDrawNumbers = [];
      url = "/info/0";
      if ($cookieStore.get("user")){
        url = "/info/" + $cookieStore.get("user").userId;
      }
      $http({
             url: url,
             method: "GET"
       })
       .then(function (response){
              parseData(response);
              if (Array.isArray(response.data.unNotifiedBets) && response.data.unNotifiedBets.length > 0){
                  $scope.alerts.push(response.data.unNotifiedBets.length);
                  $rootScope.$broadcast('unNotifiedBets', response.data.unNotifiedBets);
                  interval1 = $interval(function(){
                    $scope.alerts = [];
                  }, 3000, 1);
              } else {
                $rootScope.$broadcast('unNotifiedBets', []);
              }
       });
  }

  getInfoData();
  interval1 = $interval(function(){
    getInfoData();
  }, 180000, 0);

});






