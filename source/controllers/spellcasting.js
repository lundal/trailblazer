app.controller('SpellcastingController', ['$scope', 'BreakdownService',
function($scope, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;
    var abilityScoreByName = $scope.shared.abilityScoreByName;

    /* Private */

    $scope.spellDC = function(entry, $index) {
        var total = 0;

        total += $scope.spellDCTotal();
        total += $index;

        return total;
    };

    $scope.spellDCTooltip = function(entry, $index) {
        var tooltip = '';

        tooltip += 'Base: ' + $scope.spellDCTotal() + ', ';
        tooltip += 'Spell Level: ' + $index;

        return tooltip;
    };

    $scope.perDayTotal = function(entry, $index) {
        if (abilityScoreByName($scope.character.spelldc.ability) < 10 + $index) {
            return '–';
        }

        var total = 0;

        total += entry.clas;
        total += entry.domain;
        total += breakdownService.total(entry.misc);
        total += bonusSpells($index);

        return total;
    };

    $scope.perDayTotalTooltip = function(entry, $index) {
        if (abilityScoreByName($scope.character.spelldc.ability) < 10 + $index) {
            return 'Ability score of ' + (10 + $index) + ' required';
        }

        var tooltip = '';

        tooltip += 'Class: ' + entry.clas + ', ';
        tooltip += 'Domain: ' + entry.domain + ', ';
        tooltip += 'Misc: ' + breakdownService.total(entry.misc) + ', ';
        tooltip += 'Bonus: ' + bonusSpells($index);

        return tooltip;
    };

    var bonusSpells = function(level) {
        if (level < 1) {
            return 0;
        }

        var abilityMod = abilityModifierByName($scope.character.spelldc.ability);

        if (abilityMod < level) {
            return 0;
        }

        return Math.floor((abilityMod - level)/4) + 1;
    };

    $scope.perDayMisc = function(entry) {
        return breakdownService.total(entry.misc);
    };

    $scope.perDayMiscTooltip = function(entry) {
        return breakdownService.tooltip(entry.misc);
    };

    $scope.perDayMiscEdit = function(entry) {
        breakdownService.open(entry.misc, entry.desc + ' DC Misc');
    };

    $scope.spellDCTotal = function() {
        var total = 0;

        total += 10;
        total += abilityModifierByName($scope.character.spelldc.ability)
        total += breakdownService.total($scope.character.spelldc.misc);

        return total;
    };

    $scope.spellDCTotalTooltip = function() {
        var tooltip = '';

        tooltip += 'Base: 10, ';
        tooltip += $scope.character.spelldc.ability + ': ' + abilityModifierByName($scope.character.spelldc.ability) + ', ';
        tooltip += 'Misc: ' + breakdownService.total($scope.character.spelldc.misc);

        return tooltip;
    };

    $scope.spellDCMisc = function() {
        return breakdownService.total($scope.character.spelldc.misc);
    };

    $scope.spellDCMiscTooltip = function() {
        return breakdownService.tooltip($scope.character.spelldc.misc);
    };

    $scope.spellDCMiscEdit = function() {
        breakdownService.open($scope.character.spelldc.misc, 'Spell DC Misc');
    };
}]);
