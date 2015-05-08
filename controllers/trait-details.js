app.controller('TraitDetailsController', ['$scope', 'trait', function($scope, trait) {

    $scope.trait = trait;

    $scope.resize = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight + 2;
        element.style.height = scrollHeight + "px";    
    };

    setTimeout(function() {
        $scope.resize('trait-category');
        $scope.resize('trait-requirements');
        $scope.resize('trait-description');
    }, 100);

}]);
