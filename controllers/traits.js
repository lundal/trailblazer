app.controller('TraitsController', ['$scope', '$filter', '$modal', 'TraitService', function($scope, $filter, $modal, traitService) {

    /* Private */

    $scope.names = traitService.getList();

    $scope.onSelected = function($item, $index) {
        $scope.character.traits[$index] = traitService.getByName($item);
        /* Workaround */
        $scope.character.traits[$index].name = $item;
        $scope.traitSort();
    };

    $scope.tooltip = function(trait) {
        return trait.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new trait appear last after sorting */
        $scope.character.traits.push({name:'~'});
    };

    $scope.remove = function(index) {
        $scope.character.traits.splice(index, 1);

        if ($scope.character.traits.length == 0) {
            $scope.traitAdd();
        }
    };

    $scope.sort = function() {
        $scope.character.traits = $filter('orderBy')($scope.character.traits, 'name');
    };

    $scope.openDetails = function(trait) {
        var modalInstance = $modal.open({
            templateUrl: 'views/trait-details.html',
            controller: 'TraitDetailsController',
            size: 'm',
            resolve: {
                trait: function() { return trait }
            }
        });
    };

}]);
