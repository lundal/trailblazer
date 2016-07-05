app.controller('PortraitController', ['$scope', '$uibModal', function($scope, $modal) {

    /* Private */

    $scope.selectPortrait = function(character) {
        var modalInstance = $modal.open({
            templateUrl: 'views/portrait-selector.html',
            controller: 'PortraitSelectorController',
            size: 'm',
            resolve: {
                character: function() { return character }
            }
        });
    };

}]);
