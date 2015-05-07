app.controller('FeatDetailsController', ['$scope', 'feat', function($scope, feat) {

    $scope.feat = feat;

    $scope.resize = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight + 2;
        element.style.height = scrollHeight + "px";    
    };

    setTimeout(function() {
        $scope.resize('feat-description');
        $scope.resize('feat-prequesites');
        $scope.resize('feat-benefit');
        $scope.resize('feat-normal');
        $scope.resize('feat-special');
    }, 100);

}]);
