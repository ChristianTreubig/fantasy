football_app.controller('ModalCtrl', ["$scope", "$modal", "$log", "football", function ($scope, $modal, $log, football) {
          angular.forEach($scope.players,function(value, index){
             value.Price = value.AverageAuction;
             value.Owner = null;
          });
        
          $scope.animationsEnabled = true;
          $scope.open = function (item) {
            var index = $scope.players.indexOf(item);
        
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

football_app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "playerIndex", "football", function($scope, $modalInstance, playerIndex, football) {
    football.success(function(data) {
      $scope.players = data;
      $scope.player = angular.copy($scope.players[playerIndex]);
    
      $scope.submit = function (isValid, selectedPlayer) {
          if (!isValid) {
              alert("NOT valid");
          }
          else {
              $scope.player.Available = false;
              angular.copy($scope.player, $scope.players[playerIndex]);
              $modalInstance.close();
          }
      };
    
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
}]);