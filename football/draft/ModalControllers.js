football_app.controller('ModalCtrl', ["$scope", "$modal", "$log", "football", function ($scope, $modal, $log, football) {
  football.success(function(data) {
      $scope.players = data;
      angular.forEach($scope.players,function(value, index){
         value.Price = value.AverageAuction;
         value.Owner = null;
      });
    
      $scope.animationsEnabled = true;
    
      $scope.open = function (index) {
    
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'draft/modalContent.html',
          controller: 'ModalInstanceCtrl',
          size: "lg",
          resolve: {
            player: function () {
              return $scope.players[index];
            }
          }
        });
    
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    
      /*$scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };*/
    });
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

football_app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, player) {

  $scope.player = player;

  $scope.submit = function (isValid, selectedPlayer) {
      if (!isValid) {
          alert("NOT valid");
      }
      else{
          $scope.modalForm.$commitViewValue();
          player.Available = false;
          player.Owner = selectedPlayer.Owner;
          $modalInstance.close();
      }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});