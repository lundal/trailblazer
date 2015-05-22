app.controller('FeaturesController', ['$scope', '$filter', '$modal', function($scope, $filter, $modal) {

    /* Private */

    $scope.tooltip = function(feature) {
        return feature.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new feature appear last after sorting */
        $scope.character.features.push({name:'~'});
    };

    $scope.remove = function(index) {
        $scope.character.features.splice(index, 1);

        if ($scope.character.features.length == 0) {
            $scope.add();
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
