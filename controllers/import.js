app.controller('ImportController', ['$scope', '$location', '$modalInstance',
               'CharacterService', 'storage', 'storageService',
function($scope, $location, $modalInstance,
         characterService, storage, storageService) {

    $scope.import = function() {
        var guid = characterService.generateGUID();
        var character = characterService.import($scope.data);

        characterService.save(storageService, guid, character, function(success) {
            $location.path('character/' + storage + '/' + guid);
            $modalInstance.close();
        });
    };

}]);
