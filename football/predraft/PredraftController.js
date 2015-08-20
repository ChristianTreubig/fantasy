football_app.controller('PredraftController', ['$scope', "football", "footballConfig", function($scope, football, footballConfig) {
    football.success(function(data) { //Calling .success() here because that's the "promise" returned by $http service
        $scope.players = data;
        angular.forEach($scope.players,function(value, index){
            if (value.AverageAuction == null) {
                value.AverageAuction = 0;
            }
        });
        $scope.footballConfig = footballConfig;
        $scope.footballConfig.numOfTeams = footballConfig.numOfTeams;
        //$scope.numOfTeams = footballConfig.numOfTeams;
        
        $scope.original = angular.copy($scope.players);
        
        $scope.reset = function(data) {
          angular.copy($scope.original, $scope.players);
          $scope.predraftForm.$setPristine();
          $scope.predraftForm.$setUntouched();
        }
        
        //Sorting/Filtering:
        $scope.updateAverageAuction = function () {
            $scope.predraftForm.$commitViewValue();
        }
        $scope.selectedPos = "All";
        $scope.predicate = 'FantasyPoints';
        $scope.reverse = true;
        $scope.order = function(predicate) {
          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
          $scope.predicate = predicate;
          $scope.predraftForm.$commitViewValue();
        };
        
    });
   
    $scope.submitForm = function(isValid) {
        //If player value is empty, set it to zero.
        if (!isValid) {
         alert("NOT valid");
        }
        else{
         alert("valid");
         $scope.predraftForm.$commitViewValue();
         $scope.footballConfig.draftReady = true;
         window.location.hash = "#/draft";
        }
    }
    
}]);