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
});