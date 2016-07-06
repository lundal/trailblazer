app.controller('FeatsController', ['$scope', '$filter', '$modal', 'FeatService', 'DoubleClickService',
        function($scope, $filter, $modal, featService, doubleClickService) {

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

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(feat) {
        if (doubleClickService.click(feat) == doubleClickService.doubleClick) {
            removeItem($scope.character.feats, feat);

            if ($scope.character.feats.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(feat) {
        if (doubleClickService.wasRecentlyClicked(feat)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
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
