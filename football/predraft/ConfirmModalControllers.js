football_app.controller('ConfirmSubmitModalCtrl', ["$scope", "$modal", "footballConfig", function ($scope, $modal, footballConfig) {
  //alert("boom");      
  $scope.animationsEnabled = true;
  $scope.open = function () {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'predraft/ConfirmSubmitModalContent.html',
      controller: 'ConfirmSubmitModalInstanceCtrl',
      size: "lg",
      scope: $scope
    });
  }; 
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

football_app.controller('ConfirmSubmitModalInstanceCtrl', ["$scope", "$modalInstance", function($scope, $modalInstance) {
    //football.success(function(data) {
        //alert("boom");  
        $scope.submit = function(isValid) {
            $scope.predraftForm.$commitViewValue();
            if (!isValid) {
             alert("NOT valid");
            }
            else{
             alert("valid");
             $scope.footballConfig.draftReady = true;
             window.location.hash = "#/draft";
            }
            $modalInstance.close();
        }
    
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
    //});
}]);