app.controller('ArmorClassController', ['$scope', 'BreakdownService', function($scope, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;

    /* Private */

    $scope.armorclassNatural = function(armorclass) {
        return breakdownService.max(armorclass.natural);
    };

    $scope.armorclassNaturalTooltip = function(armorclass) {
        return breakdownService.tooltip(armorclass.natural);
    };

    $scope.armorclassNaturalEdit = function(armorclass) {
        breakdownService.open(armorclass.natural, 'Natural Armor');
    };

    $scope.armorclassDeflection = function(armorclass) {
        return breakdownService.max(armorclass.deflection);
    };

    $scope.armorclassDeflectionTooltip = function(armorclass) {
        return breakdownService.tooltip(armorclass.deflection);
    };

    $scope.armorclassDeflectionEdit = function(armorclass) {
        breakdownService.open(armorclass.deflection, 'Deflection');
    };

    $scope.armorclassDodge = function(armorclass) {
        return breakdownService.total(armorclass.dodge);
    };

    $scope.armorclassDodgeTooltip = function(armorclass) {
        return breakdownService.tooltip(armorclass.dodge);
    };

    $scope.armorclassDodgeEdit = function(armorclass) {
        breakdownService.open(armorclass.dodge, 'Dodge');
    };

    $scope.armorclassMisc = function(armorclass) {
        return breakdownService.total(armorclass.misc);
    };

    $scope.armorclassMiscTooltip = function(armorclass) {
        return breakdownService.tooltip(armorclass.misc);
    };

    $scope.armorclassMiscEdit = function(armorclass) {
        breakdownService.open(armorclass.misc, 'Misc');
    };

    /* TODO: Armor, Shield, Size */

    $scope.armorclassNormal = function(armorclass) {
        return 10
             + abilityModifierByName('dex')
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassNormalTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Dex: ' + abilityModifierByName('dex') + ', '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFooted = function(armorclass) {
        return 10
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFootedTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttack = function(armorclass) {
        return 10
             + abilityModifierByName('dex')
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttackTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Dex: ' + abilityModifierByName('dex') + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

}]);
