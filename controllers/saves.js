app.controller('SavesController', ['$scope', 'BreakdownService',
function($scope, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;

    /* Private */

    $scope.saveTotal = function(save) {
        var total = '';

        total += abilityModifierByName(save.ability);
        total += breakdownService.total(save.base);
        total += breakdownService.total(save.misc);

        return total;
    };

    $scope.saveTooltip = function(save) {
        var tooltip = '';

        tooltip += save.ability + ': ' + abilityModifierByName(save.ability) + ', ';
        tooltip += 'Base: ' + breakdownService.total(save.base) + ', ';
        tooltip += 'Misc: ' + breakdownService.total(save.misc);

        return tooltip;
    };

}]);
