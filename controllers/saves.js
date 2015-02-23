app.controller('SavesController', ['$scope', 'BreakdownService',
function($scope, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;

    /* Private */

    $scope.saveTotal = function(save) {
        var total = 0;

        total += abilityModifierByName(save.ability);
        total += breakdownService.total(save.base);
        total += breakdownService.total(save.misc);

        return total;
    };

    $scope.saveTotalTooltip = function(save) {
        var tooltip = '';

        tooltip += save.ability + ': ' + abilityModifierByName(save.ability) + ', ';
        tooltip += 'Base: ' + breakdownService.total(save.base) + ', ';
        tooltip += 'Misc: ' + breakdownService.total(save.misc);

        return tooltip;
    };

    $scope.saveBase = function(save) {
        return breakdownService.total(save.base);
    };

    $scope.saveBaseTooltip = function(save) {
        breakdownService.tooltip(save.base);
    };

    $scope.saveBaseEdit = function(save) {
        breakdownService.open(save.base, save.name + ' Misc');
    };

    $scope.saveMisc = function(save) {
        return breakdownService.total(save.misc);
    };

    $scope.saveMiscTooltip = function(save) {
        breakdownService.tooltip(save.misc);
    };

    $scope.saveMiscEdit = function(save) {
        breakdownService.open(save.misc, save.name + ' Misc');
    };

}]);
