app.controller('ListController', ['$scope', '$location', 'CharacterService',
function($scope, $location, characterService) {

    $scope.characters = [];

    $scope.create = function() {
        var guid = characterService.generateGUID();
        $location.path('character/' + guid);
    };

    $scope.deleteAll = function() {
        characterService.deleteAll();
        $scope.characters = [];
    };

    /* Initialize */

    characterService.loadAll(function(characters) {
        $scope.characters = characters;
    });

}]);
