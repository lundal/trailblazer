app.controller('SpellDetailsController', ['$scope', 'spell', function($scope, spell) {

    $scope.spell = spell;

    $scope.resize = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight + 2;
        element.style.height = scrollHeight + "px";
    };

    setTimeout(function() {
        $scope.resize('spell-description');
    }, 100);

}]);
