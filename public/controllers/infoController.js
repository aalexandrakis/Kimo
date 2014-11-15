kimoApp.controller("InfoController", function infoController($scope, $http, $cookieStore){
  if($cookieStore.get("user")){
      $scope.userCoins = $cookieStore.get("user").userCoins;
  } else {
      $scope.userCoins = 0;
  }

  $scope.nextDraw = "";
  $scope.lastDrawDate = "";
  $scope.lastDrawNumbers = [];

  $http({
         url: '/info',
         method: "GET"
       })
       .then(function(response) {
                if (response.data.message){
                    console.log(response.data);
                } else if (response.data.nextDraw){
                    console.log(response.data);
                    $scope.nextDraw = response.data.nextDraw;
                    $scope.userCoins = response.data.userCoins;
                    $scope.lastDrawDate = response.data.lastDraw.drawDateTime;
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

                    $scope.lastDrawDate = $scope.lastDrawDate.replace("T", " ").replace("Z", " ").replace(".000", "");
                    $scope.nextDraw = $scope.nextDraw.replace("T", " ").replace("Z", " ").replace(".000", "");
                    if ($cookieStore.get("user")){
                        $cookieStore.get("user").userCoins = response.data.userCoins;
                        console.log($cookieStore.get("user"));
                    }
                }
          }
      );
  });






