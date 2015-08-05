/*
This directive works, but only if the player loop is included in the directive's HTML file.
(The orderBy in the draft.html doesn't seem to be affected.)
For now, copy the controller and view code from predraft to handle sorting and filtering.
*/

football_app.directive("sortFilter", function($timeout) {
    return {
    restrict: "E",
    scope: {
        players:"="
    },
    //scope:false,
    templateUrl: "directives/sortFilter.html",
    link: function(scope, element, attrs) {
        /* ---only relevent to form in predraft.html---
        scope.updateAverageAuction = function () {
            scope.predraftForm.$commitViewValue();
        }*/ 
        
        $timeout(function() { //Fix for "Triggering Events Programmatically": https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest 
        
            alert(scope.players);
            scope.predicate = 'FantasyPoints';
            scope.reverse = true;
            scope.order = function(predicate) {
              scope.reverse = (scope.predicate === predicate) ? !scope.reverse : false;
              scope.predicate = predicate;
              //scope.predraftForm.$commitViewValue();
            };
         }, 0, false);
    }
  }
});