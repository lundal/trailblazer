app.controller('ListController', ['$scope', '$location',
               'CharacterService', 'LocalStorageService','DriveStorageService', 'DoubleClickService',
function($scope, $location,
        characterService, localStorageService, driveStorageService, doubleClickService) {

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
                    $scope.driveCharacters = characters;
                    $scope.driveLoading = false;

                    /* Force scope update */
                    if (!$scope.$$phase) $scope.$digest($scope);
                });
            }
        });
    };

    /* Character formatting and actions */

    $scope.nameText = function(character) {
        if (character.basic.name && character.basic.name != '') {
            return character.basic.name;
        }
        else {
            return '<No Name>';
        }
    };

    $scope.raceText = function(character) {
        if (character.basic.race && character.basic.race != '') {
            return character.basic.race;
        }
        else {
            return '<No Race>';
        }
    };

    $scope.classesText = function(character) {
        return 'Dumbass 9001 / Todo 3';
    };

    $scope.exportCharacter = function(character, $event) {
        $event.stopPropagation();

        alert('Todo: Export');
    };

    $scope.openCharacterLocal = function(character) {
        var guid = character.guid;
        $location.path('character/local/' + guid);
    };

    $scope.openCharacterDrive = function(character) {
        var guid = character.guid;
        $location.path('character/drive/' + guid);
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.deleteCharacterLocal = function(character, $event) {
        $event.stopPropagation();

        if (doubleClickService.click(character) == doubleClickService.doubleClick) {
            characterService.delete(localStorageService, character.guid, function(success) {});
            removeItem($scope.localCharacters, character);
        }
    };

    $scope.deleteCharacterDrive = function(character, $event) {
        $event.stopPropagation();

        if (doubleClickService.click(character) == doubleClickService.doubleClick) {
            characterService.delete(driveStorageService, character.guid, function(success) {});
            removeItem($scope.driveCharacters, character);
        }
    };

    $scope.deleteCharacterStyle = function(character) {
        if (doubleClickService.wasRecentlyClicked(character)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    /* Initialize */

    localInit();
    driveInit(true);

}]);
