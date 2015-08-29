football_app.controller('ModalCtrl', ["$scope", "$modal", "$log", "football", function ($scope, $modal, $log, football) {
          $scope.animationsEnabled = true;
          $scope.open = function (item) {
            var index = $scope.players.indexOf(item);
            item.Price = item.AverageAuction;
        
            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'draft/modalContent.html',
              controller: 'ModalInstanceCtrl',
              size: "lg",
              resolve: {
                playerIndex:function () {
                    return index;
                }
              }
            });
        
            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          }; 
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

football_app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "playerIndex", "football", "draftMeta", function($scope, $modalInstance, playerIndex, football, draftMeta) {
    football.success(function(data) {
      $scope.players = data;
      $scope.player = {};
      angular.copy($scope.players[playerIndex], $scope.player);
      $scope.draftMeta = draftMeta;
    
      $scope.submit = function (isValid) {
          if (isValid) {
              $modalInstance.close();
              $scope.player.Available = false;
              $scope.draftMeta.totalDollarsRemaining -= $scope.player.Price;
              if ($scope.player.Owner === "me") {
                  $scope.draftMeta.playerDollarsRemaining -= $scope.player.Price;
              }
              $scope.draftMeta.previousPlayerTaken = angular.copy($scope.player);
              angular.copy($scope.player, $scope.players[playerIndex]);
              
              //---Update RecommendedPrice below---//
              
              var availablePlayers = [];
              angular.forEach($scope.players, function(value, index){
                if (value.Available === true) {
                    availablePlayers.push($scope.players[index]);
                }
              });
              $scope.draftMeta.playerProportions = $scope.draftMeta.calculatePlayerProportions(availablePlayers); //Re-weight player proportions.
              console.log($scope.players[16].Name + ", " + $scope.players[16].Prop + ", " + $scope.players[16].RecommendedPrice);
              $scope.draftMeta.updatePlayerValues(availablePlayers, $scope.draftMeta.totalDollarsRemaining, $scope.draftMeta.positionProportions);
              
              //-----------------------------------//
          }
      };
    
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
    });
}]);