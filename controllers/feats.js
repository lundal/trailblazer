app.controller('FeatsController', ['$scope', '$filter', '$modal', 'FeatService', function($scope, $filter, $modal, featService) {

    /* Private */

    $scope.names = featService.getList();

    $scope.onSelected = function($item, $index) {
        $scope.character.feats[$index] = featService.getByName($item);
        /* Workaround */
        $scope.character.feats[$index].name = $item;
        $scope.sort();
    };

    $scope.tooltip = function(feat) {
        return feat.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new feat appear last after sorting */
        $scope.character.feats.push({name:'~'});
    };

    $scope.remove = function(index) {
        $scope.character.feats.splice(index, 1);

        if ($scope.character.feats.length == 0) {
            $scope.add();
        }
    };

    $scope.sort = function() {
        $scope.character.feats = $filter('orderBy')($scope.character.feats, 'name');
    };

    $scope.openDetails = function(feat) {
        var modalInstance = $modal.open({
            templateUrl: 'views/feat-details.html',
            controller: 'FeatDetailsController',
            size: 'm',
            resolve: {
                feat: function() { return feat }
            }
        });
    };

}]);
