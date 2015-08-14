football_app.controller('DraftController', ['$scope', "football", "footballConfig", "draftMeta", function($scope, football, footballConfig, draftMeta) {
    football.success(function(data) {
        $scope.players = data;
        $scope.footballConfig = footballConfig; //Need to define footballConfig service scope because we're in football block?
        $scope.draftMeta = draftMeta;// ' ' '
        $scope.totalDollars = $scope.footballConfig.numOfTeams * 200;
        $scope.draftMeta.totalDollarsRemaining = $scope.totalDollars;
        angular.forEach($scope.players,function(value, index){
            value.Available = true;
            value.RecommendedPrice = value.AverageAuction;
        });
        //$scope.draftMeta.positionValues = $scope.draftMeta.calculatePositionValues($scope.players); //Don't need this in controller?
        $scope.draftMeta.positionProportions = $scope.draftMeta.calculatePositionProportions($scope.players);
        $scope.draftMeta.playerProportions = $scope.draftMeta.calculatePlayerProportions($scope.players);
        //$scope.draftMeta.calculatePositionProportions($scope.players);
        //$scope.draftMeta.calculatePlayerProportions($scope.players);
        
        //Sorting/Filtering:
        $scope.predicate = 'FantasyPoints';
        $scope.reverse = true;
        $scope.order = function(predicate) {
          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
          $scope.predicate = predicate;
        };
        $scope.available = function(player) {
            return player.Available === true;
        }
        $scope.notAvailable = function(player) {
            return player.Available === false;
        }
        $scope.myTeam = function(player) {
            return player.Owner === "me";
        }
        
        //Undo previous pick:
        $scope.undo = function() {
            var player = $scope.draftMeta.previousPlayerTaken;
            if (player) {
                angular.forEach($scope.players,function(value, index){
                    if (value.Name === player.Name) {
                        console.log(player.Owner);
                        $scope.players[index].Available = true;
                    }
                });
                $scope.draftMeta.totalDollarsRemaining += player.Price;
                if (player.Owner === "me") {
                    $scope.draftMeta.playerDollarsRemaining += player.Price;
                }
                $scope.draftMeta.previousPlayerTaken = null;
                console.log(player.Owner);
                //Resets RecommendedPrice to prior values.
                var availablePlayers = [];
                angular.forEach($scope.players, function(value, index){
                  if (value.Available === true) {
                      availablePlayers.push($scope.players[index]);
                  }
                });
                $scope.draftMeta.playerProportions = $scope.draftMeta.calculatePlayerProportions(availablePlayers); //Re-weight player proportions.
                $scope.draftMeta.updatePlayerValues(availablePlayers, $scope.draftMeta.totalDollarsRemaining, $scope.draftMeta.positionProportions);
            }
        }
        
        //alert($scope.draftMeta.playerDollarsRemaining);
        
    });
}]);