app.controller('SheetController', ['$scope', '$routeParams', '$interval',
               'CharacterService', 'FeatService', 'SpellService', 'TraitService',
               'LocalStorageService','DriveStorageService',
function($scope, $routeParams, $interval,
          characterService, featService, spellService, traitService,
          localStorageService, driveStorageService) {

    /* Parameters */

    var guid = $routeParams.guid;
    var storage = $routeParams.storage;

    /* --- */

    $scope.shared = {};

    $scope.scrollTo = function(id, event) {
        event.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    };

    var localInit = function() {
        $scope.character = characterService.create(guid);
        $scope.localError = false;

        localStorageService.init(function(success) {
            if (!success) {
                $scope.localError = true;

                /* Force scope update */
                if (!$scope.$$phase) $scope.$digest($scope);
            }
            else {
                characterService.load(localStorageService, guid, function(character) {
                    $scope.character = character;

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
            }
        });
    };

    var driveInit = function(immediate) {
        $scope.character = characterService.create(guid);
        $scope.driveLoading = true;
        $scope.driveError = false;

        driveStorageService.init(immediate, function(success) {
            if (!success) {
                $scope.driveLoading = false;
                $scope.driveError = true;

                /* Force scope update */
                if (!$scope.$$phase) $scope.$digest($scope);
            }
            else {
                characterService.load(driveStorageService, guid, function(character) {
                    $scope.character = character;
                    $scope.driveLoading = false;

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
            }
        });
    };

    /* Initialize */

    if (storage == 'local') {
        localInit();
    }
    else {
        driveInit(true);
    };

    featService.load();
    spellService.load();
    traitService.load();

}]);
