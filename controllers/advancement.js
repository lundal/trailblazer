app.controller('AdvancementController', ['$scope', function($scope) {

    /* Private */

    var trackSlow = [0,3000,7500,14000,23000,35000,53000,77000,115000,160000,235000,330000,475000,665000,9655000,1350000,1900000,2700000,3850000,5350000];
    var trackMedium = [0,2000,5000,9000,15000,23000,35000,51000,75000,105000,155000,220000,315000,445000,635000,890000,1300000,1800000,2550000,3600000];
    var trackFast = [0,1300,3300,6000,10000,15000,23000,34000,50000,71000,105000,145000,210000,295000,425000,600000,850000,1200000,1700000,2400000];

    $scope.characterLevel = function() {
        var level = 0;
        for (var i = 0; i < $scope.character.classes.length; i++) {
            level += $scope.character.classes[i].level;
        }
        return level;
    };

    $scope.nextLevel = function() {
        var level = $scope.characterLevel();
        if (level >= 20) {
            return 999999999;
        }
        switch ($scope.character.experience.track) {
            case 'Slow':
                return trackSlow[level];
            case 'Medium':
                return trackMedium[level];
            case 'Fast':
                return trackFast[level];
            default:
                return 0;
        }
    };

    $scope.experienceTooltip = function() {
        return 'Next level: ' + $scope.nextLevel();
    }

}]);
