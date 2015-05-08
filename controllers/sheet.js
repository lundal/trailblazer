app.controller('SheetController', ['$scope', '$routeParams', '$interval',
               'CharacterService', 'FeatService', 'SpellService', 'TraitService',
function($scope, $routeParams, $interval,
          characterService, featService, spellService, traitService) {

    $scope.shared = {};

    $scope.character = characterService.load($routeParams.guid);

    $scope.scrollTo = function(id, event) {
        event.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    };

    /* Initialize */

    featService.load();
    spellService.load();
    traitService.load();

    /* Save periodicly */

    var saveTimer = $interval(function() {
        characterService.save($scope.character);
    }, 1000);

    $scope.$on('$destroy', function() {
        $interval.cancel(saveTimer);
    });
}]);
