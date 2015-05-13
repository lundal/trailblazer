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

    /* TODO: Armor, Shield */

    $scope.armorclassNormal = function(armorclass) {
        return 10
             + $scope.armorclassSizeModifier()
             + abilityModifierByName('dex')
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassNormalTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + $scope.armorclassSizeModifier() + ', '
             + 'Dex: ' + abilityModifierByName('dex') + ', '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFooted = function(armorclass) {
        return 10
             + $scope.armorclassSizeModifier()
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFootedTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + $scope.armorclassSizeModifier() + ', '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttack = function(armorclass) {
        return 10
             + $scope.armorclassSizeModifier()
             + abilityModifierByName('dex')
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttackTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + $scope.armorclassSizeModifier() + ', '
             + 'Dex: ' + abilityModifierByName('dex') + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassSizeModifier = function() {
        switch ($scope.character.basic.size) {
            case 'C': return -8;
            case 'G': return -4;
            case 'H': return -2;
            case 'L': return -1;
            case 'M': return 0;
            case 'S': return 1;
            case 'T': return 2;
            case 'D': return 4;
            case 'F': return 8;
            default: return 0;
        }
    }

}]);
