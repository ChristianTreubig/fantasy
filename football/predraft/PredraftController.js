football_app.controller('PredraftController', ['$scope', "football", function($scope, football) {
    football.success(function(data) {
        $scope.players = data;
        angular.forEach($scope.players,function(value, index){
            if (value.AverageAuction == null) {
                value.AverageAuction = 0;
            }
        })
        
        $scope.original = angular.copy($scope.players);
        
        $scope.reset = function(data) {
          angular.copy($scope.original, $scope.players);
          $scope.predraftForm.$setPristine();
          //$scope.predraftForm.$setUntouched();
          alert($scope.players[3].AverageAuction);
        }
        
    });
   
    $scope.submitForm = function(isValid) {
        if (!isValid) {
         //alert("NOT valid");
        }
        else{
         //alert("valid");
         $scope.draftReady = true;
         window.location.hash = "#/draft";
        }
    }
    
    
}]);