app.controller('SheetController', ['$scope', '$routeParams', '$interval', 'CharacterService', 'FeatService',
function($scope, $routeParams, $interval, characterService, featService) {

    $scope.shared = {};

    $scope.character = characterService.load($routeParams.guid);

    featService.load();

    /* Save periodicly */

    var saveTimer = $interval(function() {
        characterService.save($scope.character);
    }, 1000);

    $scope.$on('$destroy', function() {
        $interval.cancel(saveTimer);
    });
}]);
