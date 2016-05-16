app.controller('ProficienciesController', ['$scope', '$filter',  'DoubleClickService',
        function($scope, $filter, doubleClickService) {

    /* Private */

    $scope.tooltip = function(proficiency) {
        return proficiency.name;
    };

    $scope.add = function() {
        /* Tilde is used to make the new feat appear last after sorting */
        $scope.character.proficiencies.push({name:'~'});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(proficiency) {
        if (doubleClickService.click(proficiency) == doubleClickService.doubleClick) {
            removeItem($scope.character.proficiencies, proficiency);

            if ($scope.character.feats.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(proficiency) {
        if (doubleClickService.wasRecentlyClicked(proficiency)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function() {
        $scope.character.proficiencies = $filter('orderBy')($scope.character.proficiencies, 'name');
    };

}]);
