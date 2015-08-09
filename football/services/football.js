football_app.factory('football', ['$http', function($http) {
  return $http.get(window.location.origin + '/football/data/football_2015.json')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}])
.factory('footballConfig', function footballConfigFactory() {
    return {
        numOfTeams:12,
        draftReady:false
    }
})
.factory("draftMeta", function() {
    //Get predraft values allocated to each position:
    var calculatePositionValues = function (players) {
        var All_total = 0;
        var QB_total = 0;
        var RB_total = 0;
        var WR_total = 0;
        var TE_total = 0;
        var K_total = 0;
        angular.forEach(players, function(value, index){
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
        return {
            All_total: All_total,
            QB_total: QB_total,
            RB_total: RB_total,
            WR_total: WR_total,
            TE_total: TE_total,
            K_total: K_total
        }
    }
    
    //Get proportion of predraft values allocated to each position:
    var calculatePositionProportions = function(players) {
        var QB_total = calculatePositionValues(players).QB_total;
        var RB_total = calculatePositionValues(players).RB_total;
        var WR_total = calculatePositionValues(players).WR_total;
        var TE_total = calculatePositionValues(players).TE_total;
        var K_total = calculatePositionValues(players).K_total;
        var All_total = QB_total + RB_total + WR_total + TE_total + K_total;
        QB_prop = QB_total / All_total;
        RB_prop = RB_total / All_total;
        WR_prop = WR_total / All_total;
        TE_prop = TE_total / All_total;
        K_prop = K_total / All_total;
        return {
            QB_prop: QB_prop,
            RB_prop: RB_prop,
            WR_prop: WR_prop,
            TE_prop: TE_prop,
            K_prop: K_prop,
        }
    }
    
    //Get proportion of predraft values for each player in relation to their position:
    var calculatePlayerProportions = function(players) {
        angular.forEach(players, function(value, index){
            if (value.Pos == "QB") {
                players[index].Prop = value.AverageAuction / calculatePositionValues(players).QB_total;
            }
            else if (value.Pos == "RB") {
                players[index].Prop = value.AverageAuction / calculatePositionValues(players).RB_total;
            }
            else if (value.Pos == "WR") {
                players[index].Prop = value.AverageAuction / calculatePositionValues(players).WR_total;
            }
            else if (value.Pos == "TE") {
                players[index].Prop = value.AverageAuction / calculatePositionValues(players).TE_total;
            }
            else if (value.Pos == "K") {
                players[index].Prop = value.AverageAuction / calculatePositionValues(players).K_total;
            }
        });
        return players;
    }
    
    return{
        playerDollarsRemaining: 200,
        totalDollarsRemaining: null,
        previousPlayerTaken: null, //For undo functionality.
        calculatePositionProportions: calculatePositionProportions,
        calculatePlayerProportions: calculatePlayerProportions
    }
});
