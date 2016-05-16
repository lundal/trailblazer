app.controller('LanguagesController', ['$scope', '$filter', '$modal', 'LanguageService', 'DoubleClickService',
        function($scope, $filter, $modal, languageService, doubleClickService) {

    /* Private */

    $scope.names = languageService.getList();

    $scope.onSelected = function($item, $index) {
        $scope.character.languages[$index] = languageService.getByName($item);
        /* Workaround */
        $scope.character.languages[$index].name = $item;
        $scope.sort();
    };

    $scope.tooltip = function(language) {
        return 'Spoken by: ' + language.description;
    };

    $scope.add = function() {
        /* Tilde is used to make the new language appear last after sorting */
        $scope.character.languages.push({name:'~'});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(language) {
        if (doubleClickService.click(language) == doubleClickService.doubleClick) {
            removeItem($scope.character.languages, language);

            if ($scope.character.languages.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(language) {
        if (doubleClickService.wasRecentlyClicked(language)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function() {
        $scope.character.languages = $filter('orderBy')($scope.character.languages, 'name');
    };

    $scope.openDetails = function(language) {
        var modalInstance = $modal.open({
            templateUrl: 'views/language-details.html',
            controller: 'LanguageDetailsController',
            size: 'm',
            resolve: {
                language: function() { return language }
            }
        });
    };

}]);
