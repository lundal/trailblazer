app.controller('TraitsController', ['$scope', '$filter', '$modal', 'TraitService', 'DoubleClickService',
        function($scope, $filter, $modal, traitService, doubleClickService) {

    /* Private */

    $scope.names = traitService.getList();

    $scope.onSelected = function($item, $index) {
        $scope.character.traits[$index] = traitService.getByName($item);
        /* Workaround */
        $scope.character.traits[$index].name = $item;
        $scope.sort();
    };

    $scope.tooltip = function(trait) {
        return trait.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new trait appear last after sorting */
        $scope.character.traits.push({name:'~'});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(trait) {
        if (doubleClickService.click(trait) == doubleClickService.doubleClick) {
            removeItem($scope.character.traits, trait);

            if ($scope.character.traits.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(trait) {
        if (doubleClickService.wasRecentlyClicked(trait)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
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
