app.controller('LanguageDetailsController', ['$scope', 'language', function($scope, language) {

    $scope.language = language;

    $scope.resize = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight + 2;
        element.style.height = scrollHeight + "px";
    };

    setTimeout(function() {
        $scope.resize('language-spokenby');
        $scope.resize('language-description');
    }, 100);

}]);
