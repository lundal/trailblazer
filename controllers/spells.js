app.controller('SpellsController', ['$scope', '$filter', '$modal', 'SpellService', 'DoubleClickService',
        function($scope, $filter, $modal, spellService, doubleClickService) {

    /* Private */

    $scope.names = spellService.getList();

    $scope.onSelected = function(list, $item, $index) {
        list[$index] = spellService.getByName($item);
        /* Workaround */
        list[$index].name = $item;
        list[$index].prepared = 0;
        list[$index].cast = 0;
        $scope.sort(list);
    };

    $scope.tooltip = function(spell) {
        return spell.description;
    };

    $scope.add = function(list) {
        /* Tilde is used to make the new trait appear last after sorting */
        list.push({prepared:0,cast:0,name:'~'});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(list, spell) {
        if (doubleClickService.click(spell) == doubleClickService.doubleClick) {
            removeItem(list, spell);

            if (list.length == 0) {
                $scope.add(list);
            }
        }
    };

    $scope.removeStyle = function(spell) {
        if (doubleClickService.wasRecentlyClicked(spell)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function(list) {
        sortedList = $filter('orderBy')(list, 'name');
        for (i = 0; i < list.length; i++) {
            list[i] = sortedList[i];
        }
    };

    $scope.openDetails = function(spell) {
        var modalInstance = $modal.open({
            templateUrl: 'views/spell-details.html',
            controller: 'SpellDetailsController',
            size: 'm',
            resolve: {
                spell: function() { return spell }
            }
        });
    };

}]);
