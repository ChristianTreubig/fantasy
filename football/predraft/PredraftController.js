football_app.controller('PredraftController', ['$scope', "football", function($scope, football) {
    football.success(function(data) {
        $scope.players = data;
    });
}]);