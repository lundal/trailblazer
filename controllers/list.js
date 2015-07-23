app.controller('ListController', ['$scope', '$location',
               'CharacterService', 'LocalStorageService','DriveStorageService',
function($scope, $location,
        characterService, localStorageService, driveStorageService) {

    $scope.loading = true;
    $scope.characters = [];

    $scope.create = function() {
        var guid = characterService.generateGUID();
        $location.path('character/' + guid);
    };

    $scope.deleteAll = function() {
        characterService.deleteAll(localStorageService, function(success) {});
        characterService.deleteAll(driveStorageService, function(success) {});
        $scope.characters = [];
    };

    /* Initialize */

    localStorageService.init(function(success) {
        if (!success) {
            alert('Error: Unable to store characters locally!');
            return;
        };
        characterService.loadAll(localStorageService, function(characters) {
            $scope.loading = false;
            $scope.characters = characters;

            /* Force scope update */
            if (!$scope.$$phase) $scope.$digest($scope);
        });
    });

    driveStorageService.init(true, function(success) {
        return; // Disable
        if (!success) {
            alert('Error: Unable to store characters in drive!');
            return;
        }
        characterService.loadAll(driveStorageService, function(characters) {
            $scope.loading = false;
            $scope.characters = characters;

            /* Force scope update */
            if (!$scope.$$phase) $scope.$digest($scope);
        });
    });

}]);
