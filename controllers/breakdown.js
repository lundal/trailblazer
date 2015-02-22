app.controller('BreakdownController', ['$scope', 'items', 'title', function($scope, items, title) {

    $scope.items = items;
    $scope.title = title;

    $scope.add = function() {
        $scope.items.push({bonus:0, desc:''});
    };

    $scope.remove = function(index) {
        $scope.items.splice(index, 1);

        if ($scope.items.length == 0) {
            $scope.add();
        }
    };
}]);
