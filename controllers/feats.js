app.controller('FeatsController', ['$scope', '$filter', '$modal', 'FeatService', function($scope, $filter, $modal, featService) {

    /* Private */

    $scope.featNames = featService.getList();

    $scope.featSelected = function($item, $index) {
        $scope.character.feats[$index] = featService.getByName($item);
        /* Workaround */
        $scope.character.feats[$index].name = $item;
        $scope.featSort();
    };

    $scope.featTooltip = function(feat) {
        return feat.description;
    };

    $scope.featAdd = function() {
        /* Tilde is used to make the new feat appear last after sorting */
        $scope.character.feats.push({name:'~', description:''});
    };

    $scope.featRemove = function(index) {
        $scope.character.feats.splice(index, 1);

        if ($scope.character.feats.length == 0) {
            $scope.featAdd();
        }
    };

    $scope.featSort = function() {
        $scope.character.feats = $filter('orderBy')($scope.character.feats, 'name');
    };

    $scope.openDetails = function(feat) {
        var modalInstance = $modal.open({
            templateUrl: 'views/feat-details.html',
            controller: 'FeatDetailsController',
            size: 'lg',
            resolve: {
                feat: function() { return feat }
            }
        });
    };

}]);
