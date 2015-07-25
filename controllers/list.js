app.controller('ListController', ['$scope', '$location',
               'CharacterService', 'LocalStorageService','DriveStorageService',
function($scope, $location,
        characterService, localStorageService, driveStorageService) {

    $scope.localCreate = function() {
        var guid = characterService.generateGUID();
        $location.path('character/local/' + guid);
    };

    $scope.localDeleteAll = function() {
        characterService.deleteAll(localStorageService, function(success) {});
        $scope.localCharacters = [];
    };

    var localInit = function() {
        $scope.localCharacters = [];
        $scope.localError = false;

        localStorageService.init(function(success) {
            if (!success) {
                $scope.localError = true;

                /* Force scope update */
                if (!$scope.$$phase) $scope.$digest($scope);
            }
            else {
                characterService.loadAll(localStorageService, function(characters) {
                    $scope.localCharacters = characters;

                    /* Force scope update */
                    if (!$scope.$$phase) $scope.$digest($scope);
                });
            }
        });
    };

    $scope.driveCreate = function() {
        var guid = characterService.generateGUID();
        $location.path('character/drive/' + guid);
    };

    $scope.driveDeleteAll = function() {
        characterService.deleteAll(driveStorageService, function(success) {});
        $scope.driveCharacters = [];
    };

    $scope.driveRetry = function() {
        driveInit(false);
    };

    var driveInit = function(immediate) {
        $scope.driveCharacters = [];
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
                characterService.loadAll(driveStorageService, function(characters) {
                    $scope.driveLoading = false;
                    $scope.driveCharacters = characters;

                    /* Force scope update */
                    if (!$scope.$$phase) $scope.$digest($scope);
                });
            }
        });
    };

    /* Initialize */

    localInit();
    driveInit(true);

}]);
