app.controller('SheetController', ['$scope', '$routeParams', '$interval',
               'CharacterService', 'FeatService', 'SpellService', 'TraitService',
               'LocalStorageService','DriveStorageService',
function($scope, $routeParams, $interval,
          characterService, featService, spellService, traitService,
          localStorageService, driveStorageService) {

    $scope.shared = {};

    $scope.scrollTo = function(id, event) {
        event.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    };

    /* Initialize */

    var guid = $routeParams.guid;
    var storage = $routeParams.storage;

    $scope.character = characterService.create(guid);

    if (storage == 'local') {
        localStorageService.init(function(success) {
            if (!success) {
                alert('Error: Unable to store characters locally!');
                return;
            }
            characterService.load(localStorageService, guid, function(character) {
                $scope.character = character;
                $scope.forceUpdate;

                /* Force scope update */
                if (!$scope.$$phase) $scope.$digest($scope);

                /* Save periodicly */

                var saveTimer = $interval(function() {
                    characterService.save(localStorageService, guid, $scope.character, function(success) {});
                }, 1000);

                $scope.$on('$destroy', function() {
                    $interval.cancel(saveTimer);
                });
            });
        });
    }
    else {
        driveStorageService.init(true, function(success) {
            if (!success) {
                alert('Error: Unable to store characters in drive!');
                return;
            }
            characterService.load(driveStorageService, guid, function(character) {
                $scope.character = character;

                /* Force scope update */
                if (!$scope.$$phase) $scope.$digest($scope);

                /* Save periodicly */

                var saveTimer = $interval(function() {
                    characterService.save(driveStorageService, guid, $scope.character, function(success) {});
                }, 1000);

                $scope.$on('$destroy', function() {
                    $interval.cancel(saveTimer);
                });
            });
        });
    };

    featService.load();
    spellService.load();
    traitService.load();

}]);
