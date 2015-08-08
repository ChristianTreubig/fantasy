football_app.controller('DraftController', ['$scope', "football", "footballConfig", "draftMeta", function($scope, football, footballConfig, draftMeta) {
    football.success(function(data) {
        $scope.players = data;
        $scope.footballConfig = footballConfig; //Need to define footballConfig service scope because we're in football block?
        $scope.draftMeta = draftMeta;// ' ' '
        $scope.totalDollars = $scope.footballConfig.numOfTeams * 200;
        $scope.draftMeta.totalDollarsRemaining = $scope.totalDollars;
        angular.forEach($scope.players,function(value, index){
            value.Available = true;
        });
        
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
        
        //Get proportion of predraft values allocated to each position:
        var calculatePositionProportions = function() {
            QB_total = 0; //Need to put these totals in $scope?
            RB_total = 0;
            WR_total = 0;
            TE_total = 0;
            K_total = 0;
            angular.forEach($scope.players, function(value, index){
                if (value.Pos == "QB") {
                    QB_total += value.AverageAuction;
                }
                else if (value.Pos == "RB") {
                    RB_total += value.AverageAuction;
                }
                else if (value.Pos == "WR") {
                    WR_total += value.AverageAuction;
                }
                else if (value.Pos == "TE") {
                    TE_total += value.AverageAuction;
                }
                else if (value.Pos == "K") {
                    K_total += value.AverageAuction;
                }
            });
            All_total = QB_total + RB_total + WR_total + TE_total + K_total;
            $scope.QB_prop = QB_total / All_total;
            $scope.RB_prop = RB_total / All_total;
            $scope.WR_prop = WR_total / All_total;
            $scope.TE_prop = TE_total / All_total;
            $scope.K_prop = K_total / All_total;
            //alert(QB_prop + RB_prop + WR_prop + TE_prop);
        }
        
        calculatePositionProportions();
        //alert($scope.QB_prop);
        
        //Get proportion of predraft values for each player in relation to their position:
        var calculatePlayerProportions = function() {
            angular.forEach($scope.players, function(value, index){
                if (value.Pos == "QB") {
                    $scope.players[index].Prop = value.AverageAuction / QB_total;
                }
                else if (value.Pos == "RB") {
                    $scope.players[index].Prop = value.AverageAuction / RB_total;
                }
                else if (value.Pos == "WR") {
                    $scope.players[index].Prop = value.AverageAuction / WR_total;
                }
                else if (value.Pos == "TE") {
                    $scope.players[index].Prop = value.AverageAuction / TE_total;
                }
                else if (value.Pos == "K") {
                    $scope.players[index].Prop = value.AverageAuction / K_total;
                }
            });
        }
        
        calculatePlayerProportions();
        
        //Undo previous pick:
        $scope.undo = function() {
            var player = $scope.draftMeta.previousPlayerTaken;
            if (player) {
                angular.forEach($scope.players,function(value, index){
                    if (value.Name === player.Name) {
                        $scope.players[index].Available = true;
                    }
                });
                $scope.draftMeta.totalDollarsRemaining += player.Price;
                if (player.Owner === "me") {
                    $scope.draftMeta.playerDollarsRemaining += player.Price;
                }
                $scope.draftMeta.previousPlayerTaken = null;
            }
        }
        
        //alert($scope.draftMeta.playerDollarsRemaining);
        
    });
}]);