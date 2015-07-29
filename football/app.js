var football_app = angular.module('FootballApp', ["ngRoute"]);


football_app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "intro/intro.html"
    })
    .when('/predraft', {
      controller: "PredraftController",
      templateUrl: "predraft/predraft.html"
    })
    //Player values set in predraft need to carry over to draft: http://stackoverflow.com/a/13882409
    //May be best to combine predraft and draft.
    .when('/draft', {
      controller: "DraftController",
      templateUrl: "draft/draft.html"
    })
    .otherwise({
      redirectTo: '/'
    });
});
