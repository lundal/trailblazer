app.controller('HitPointsController', ['$scope', 'BreakdownService',
function($scope, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;
    var abilityScoreByName = $scope.shared.abilityScoreByName;
    var characterLevel = $scope.shared.characterLevel;
    var classHitPoints = $scope.shared.classHitPoints;

    /* Private */

    $scope.hpMax = function() {
        var total = 0;

        if ($scope.character.hp.auto) {
            total += classHitPoints();
            total += abilityModifierByName('con') * characterLevel();
        }

        total += breakdownService.total($scope.character.hp.max);

        return total;
    };

    $scope.hpMaxTooltip = function() {
        var tooltip = '';

        if ($scope.character.hp.auto) {
            tooltip += 'Class: ' + classHitPoints() + ', ';
            tooltip += 'Con: ' + (abilityModifierByName('con') * characterLevel()) + ', ';
        }

        tooltip += breakdownService.tooltip($scope.character.hp.max);

        return tooltip;
    };

    $scope.hpMaxEdit = function() {
        breakdownService.open($scope.character.hp.max, 'Max Hit Points');
    };

    $scope.hpAboveZeroPercent = function() {
        var max = $scope.hpMax();
        var current = 0 + $scope.character.hp.current + $scope.character.hp.temp;

        if (max == 0 || current <= 0) {
            return 0;
        }

        if (current > max) {
            return 100;
        }

        return 100 * current / max;
    };

    $scope.hpBelowZeroPercent = function() {
        var min = 0-abilityScoreByName('con');
        var current = 0 + $scope.character.hp.current + $scope.character.hp.temp;

        if (min == 0 || current >= 0) {
            return 0;
        }

        if (current < min) {
            return 100;
        }

        return 100 * current / min;
    };

}]);
