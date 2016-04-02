var app = angular.module('CharacterSheet', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/character/:storage/:guid', {
        templateUrl: 'views/sheet.html'
    })
    .otherwise({
        templateUrl: 'views/list.html'
    });

}]);

var setAppTitle = function(text) {
    if (text && text != "") {
        document.title = text + " – Trailblazer";
    }
    else {
        document.title = "Trailblazer";
    }
}
