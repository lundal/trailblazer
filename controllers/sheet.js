app.controller('SheetController', ['$scope', '$routeParams', '$interval', 'CharacterService',
function($scope, $routeParams, $interval, characterService) {

    $scope.shared = {};

    $scope.character = characterService.load($routeParams.guid);

    /* Save periodicly */

    var saveTimer = $interval(function() {
        characterService.save($scope.character);
    }, 1000);

    $scope.$on('$destroy', function() {
        $interval.cancel(saveTimer);
    });
}]);
