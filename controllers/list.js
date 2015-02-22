app.controller('ListController', ['$scope', '$location', 'CharacterService',
function($scope, $location, characterService) {

    $scope.characters = characterService.loadAll();

    $scope.create = function() {
        var guid = characterService.generateGUID();
        $location.path('character/' + guid);
    };

    $scope.deleteAll = function() {
        characterService.deleteAll();
        $scope.characters = [];
    };

}]);
