app.controller('ArmorClassController', ['$scope', 'BreakdownService', function($scope, breakdownService) {

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

    $scope.armorclassNormal = function(armorclass) {
        return 10
             + armorclassSizeModifier()
             + equipmentDexBonus()
             + equipmentArmorClass()
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassNormalTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Dex: ' + equipmentDexBonus() + ', '
             + 'Armor/Shield: ' + equipmentArmorClass() + ', '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFooted = function(armorclass) {
        return 10
             + armorclassSizeModifier()
             + equipmentArmorClass()
             + $scope.armorclassNatural(armorclass)
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassFlatFootedTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Armor/Shield: ' + equipmentArmorClass() + ', '
             + 'Natural: ' + $scope.armorclassNatural(armorclass) + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttack = function(armorclass) {
        return 10
             + armorclassSizeModifier()
             + equipmentDexBonus()
             + $scope.armorclassDeflection(armorclass)
             + $scope.armorclassDodge(armorclass)
             + $scope.armorclassMisc(armorclass);
    };

    $scope.armorclassTouchAttackTooltip = function(armorclass) {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Dex: ' + equipmentDexBonus() + ', '
             + 'Deflection: ' + $scope.armorclassDeflection(armorclass) + ', '
             + 'Dodge: ' + $scope.armorclassDodge(armorclass) + ', '
             + 'Misc: ' + $scope.armorclassMisc(armorclass);
    };

    var armorclassSizeModifier = function() {
        switch ($scope.character.basic.size) {
            case 'Colossal': return -8;
            case 'Gargantuan': return -4;
            case 'Huge': return -2;
            case 'Large': return -1;
            case 'Medium': return 0;
            case 'Small': return 1;
            case 'Tiny': return 2;
            case 'Diminutive': return 4;
            case 'Fine': return 8;
            default: return 0;
        }
    };

    /* Imports used */

    var equipmentArmorClass = function() {
        if ($scope.shared.equipmentArmorClass) {
            return $scope.shared.equipmentArmorClass();
        }
        else {
            return 0;
        }
    };

    var equipmentDexBonus = function() {
        if ($scope.shared.equipmentMaxDex && $scope.shared.abilityModifierByName) {
            return Math.min($scope.shared.abilityModifierByName('dex'), $scope.shared.equipmentMaxDex());
        }
        else {
            return 0;
        }
    };

}]);
