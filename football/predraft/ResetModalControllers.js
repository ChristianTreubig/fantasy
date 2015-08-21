football_app.controller('ResetModalCtrl', ["$scope", "$modal", "footballConfig", function ($scope, $modal, footballConfig) {
  //alert("boom");      
  $scope.animationsEnabled = true;
  $scope.open = function () {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'predraft/ResetModalContent.html',
      controller: 'ResetModalInstanceCtrl',
      size: "lg",
      scope: $scope
    });
  }; 
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

football_app.controller('ResetModalInstanceCtrl', ["$scope", "$modalInstance", function($scope, $modalInstance) {
    //football.success(function(data) {
        //alert("boom");  
        $scope.reset = function(data) {
          angular.copy($scope.original, $scope.players);
          $scope.predraftForm.$setPristine();
          $scope.predraftForm.$setUntouched();
          $modalInstance.close();
        }
        
    
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
    //});
}]);