app.controller('ListController', ['$scope', '$location',
               'CharacterService', 'LocalStorageService','DriveStorageService', 'DoubleClickService',
function($scope, $location,
        characterService, localStorageService, driveStorageService, doubleClickService) {

    $scope.localCreate = function() {
        var guid = characterService.generateGUID();
        $location.path('character/local/' + guid);
    };

    $scope.localImport = function() {
        alert('Todo: Import');
    };

    $scope.localOpen = function(character) {
        var guid = character.guid;
        $location.path('character/local/' + guid);
    };

    $scope.localDelete = function(character, $event) {
        $event.stopPropagation();

        if (doubleClickService.click(character) == doubleClickService.doubleClick) {
            characterService.delete(localStorageService, character.guid, function(success) {});
            removeItem($scope.localCharacters, character);
        }
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

    $scope.driveImport = function() {
        alert('Todo: Import');
    };

    $scope.driveOpen = function(character) {
        var guid = character.guid;
        $location.path('character/drive/' + guid);
    };

    $scope.driveDelete = function(character, $event) {
        $event.stopPropagation();

        if (doubleClickService.click(character) == doubleClickService.doubleClick) {
            characterService.delete(driveStorageService, character.guid, function(success) {});
            removeItem($scope.driveCharacters, character);
        }
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

    $scope.export = function(character, $event) {
        $event.stopPropagation();

        alert(characterService.export(character));
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
        var text = '';
        for (var i = 0; i < character.classes.length; i++) {
            var clas = character.classes[i];
            if (clas.name != '') {
                if (text != '') {
                    text += ' / ';
                }
                text += clas.name + ' ' + clas.level;
            }
        }
        if (text == '') {
            return '<No Class>';
        }
        return text;
    };

    $scope.deleteStyle = function(character) {
        if (doubleClickService.wasRecentlyClicked(character)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    /* Initialize */

    localInit();
    driveInit(true);

}]);
