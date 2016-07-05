app.controller('FeaturesController', ['$scope', '$filter', '$uibModal', 'DoubleClickService',
        function($scope, $filter, $modal, doubleClickService) {

    /* Private */

    $scope.tooltip = function(feature) {
        return feature.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new feature appear last after sorting */
        $scope.character.features.push({name:'~'});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(feature) {
        if (doubleClickService.click(feature) == doubleClickService.doubleClick) {
            removeItem($scope.character.features, feature);

            if ($scope.character.features.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(feature) {
        if (doubleClickService.wasRecentlyClicked(feature)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function() {
        $scope.character.features = $filter('orderBy')($scope.character.features, 'name');
    };

    $scope.openDetails = function(feature) {
        var modalInstance = $modal.open({
            templateUrl: 'views/feature-details.html',
            controller: 'FeatureDetailsController',
            size: 'm',
            resolve: {
                feature: function() { return feature }
            }
        });
    };

}]);
