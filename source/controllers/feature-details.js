app.controller('FeatureDetailsController', ['$scope', 'feature', function($scope, feature) {

    $scope.feature = feature;

    $scope.resize = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight + 2;
        element.style.height = scrollHeight + "px";    
    };

    setTimeout(function() {
        $scope.resize('feature-description');
    }, 100);

}]);
