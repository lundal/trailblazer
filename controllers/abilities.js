app.controller('AbilitiesController', ['$scope', 'BreakdownService', function($scope, breakdownService) {

    /* Private */

    $scope.abilityScoreBase = function(ability) {
        return breakdownService.total(ability.base);
    };

    $scope.abilityScoreBaseTooltip = function(ability) {
        breakdownService.tooltip(ability.base);
    };

    $scope.abilityScoreBaseEdit = function(ability) {
        breakdownService.open(ability.base, ability.name + ' Score');
    };

    $scope.abilityModifierBase = function(ability) {
        return Math.floor($scope.abilityScoreBase(ability) / 2) - 5;
    };

    $scope.abilityScoreTemp = function(ability) {
        return breakdownService.total(ability.base) + breakdownService.total(ability.temp);
    };

    $scope.abilityScoreTempTooltip = function(ability) {
        breakdownService.tooltip(ability.temp);
    };

    $scope.abilityScoreTempEdit = function(ability) {
        breakdownService.open(ability.temp, ability.name + ' Temp');
    };

    $scope.abilityModifierTemp = function(ability) {
        return Math.floor($scope.abilityScoreTemp(ability) / 2) - 5;
    };

    /* Shared */

    $scope.shared.abilityModifierByName = function(abilityName) {
        if (abilityName.toLowerCase() == 'str') return $scope.abilityModifierTemp($scope.character.abilities[0]);
        if (abilityName.toLowerCase() == 'dex') return $scope.abilityModifierTemp($scope.character.abilities[1]);
        if (abilityName.toLowerCase() == 'con') return $scope.abilityModifierTemp($scope.character.abilities[2]);
        if (abilityName.toLowerCase() == 'int') return $scope.abilityModifierTemp($scope.character.abilities[3]);
        if (abilityName.toLowerCase() == 'wis') return $scope.abilityModifierTemp($scope.character.abilities[4]);
        if (abilityName.toLowerCase() == 'cha') return $scope.abilityModifierTemp($scope.character.abilities[5]);
    };

}]);
