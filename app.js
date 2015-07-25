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

if (typeof(Storage) === "undefined") {
    alert("Your browser does not have support for LocalStorage. Characters can not be saved!");
}
