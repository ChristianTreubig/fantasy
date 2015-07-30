football_app.controller('DraftController', ['$scope', "football", function($scope, football) {
    football.success(function(data) {
        $scope.players = data;
        alert($scope.players[3].AverageAuction);
    });
}]);