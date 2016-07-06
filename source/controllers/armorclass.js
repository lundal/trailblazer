app.controller('ArmorClassController', ['$scope', 'BreakdownService', function($scope, breakdownService) {

    /* Imported */

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

    /* Private */

    $scope.armorclassNatural = function() {
        return breakdownService.max($scope.character.armorclass.natural);
    };

    $scope.armorclassNaturalTooltip = function() {
        return breakdownService.tooltip($scope.character.armorclass.natural);
    };

    $scope.armorclassNaturalEdit = function() {
        breakdownService.open($scope.character.armorclass.natural, 'Natural Armor');
    };

    $scope.armorclassDeflection = function() {
        return breakdownService.max($scope.character.armorclass.deflection);
    };

    $scope.armorclassDeflectionTooltip = function() {
        return breakdownService.tooltip($scope.character.armorclass.deflection);
    };

    $scope.armorclassDeflectionEdit = function() {
        breakdownService.open($scope.character.armorclass.deflection, 'Deflection');
    };

    $scope.armorclassDodge = function() {
        return breakdownService.total($scope.character.armorclass.dodge);
    };

    $scope.armorclassDodgeTooltip = function() {
        return breakdownService.tooltip($scope.character.armorclass.dodge);
    };

    $scope.armorclassDodgeEdit = function() {
        breakdownService.open($scope.character.armorclass.dodge, 'Dodge');
    };

    $scope.armorclassMisc = function() {
        return breakdownService.total($scope.character.armorclass.misc);
    };

    $scope.armorclassMiscTooltip = function() {
        return breakdownService.tooltip($scope.character.armorclass.misc);
    };

    $scope.armorclassMiscEdit = function() {
        breakdownService.open($scope.character.armorclass.misc, 'Misc');
    };

    $scope.armorclassNormal = function() {
        return 10
             + armorclassSizeModifier()
             + equipmentDexBonus()
             + equipmentArmorClass()
             + $scope.armorclassNatural()
             + $scope.armorclassDeflection()
             + $scope.armorclassDodge()
             + $scope.armorclassMisc();
    };

    $scope.armorclassNormalTooltip = function() {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Dex: ' + equipmentDexBonus() + ', '
             + 'Armor/Shield: ' + equipmentArmorClass() + ', '
             + 'Natural: ' + $scope.armorclassNatural() + ', '
             + 'Deflection: ' + $scope.armorclassDeflection() + ', '
             + 'Dodge: ' + $scope.armorclassDodge() + ', '
             + 'Misc: ' + $scope.armorclassMisc();
    };

    $scope.armorclassFlatFooted = function() {
        return 10
             + armorclassSizeModifier()
             + equipmentArmorClass()
             + $scope.armorclassNatural()
             + $scope.armorclassDeflection()
             + $scope.armorclassMisc();
    };

    $scope.armorclassFlatFootedTooltip = function() {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Armor/Shield: ' + equipmentArmorClass() + ', '
             + 'Natural: ' + $scope.armorclassNatural() + ', '
             + 'Deflection: ' + $scope.armorclassDeflection() + ', '
             + 'Misc: ' + $scope.armorclassMisc();
    };

    $scope.armorclassTouchAttack = function() {
        return 10
             + armorclassSizeModifier()
             + equipmentDexBonus()
             + $scope.armorclassDeflection()
             + $scope.armorclassDodge()
             + $scope.armorclassMisc();
    };

    $scope.armorclassTouchAttackTooltip = function() {
        return 'Base: 10, '
             + 'Size: ' + armorclassSizeModifier() + ', '
             + 'Dex: ' + equipmentDexBonus() + ', '
             + 'Deflection: ' + $scope.armorclassDeflection() + ', '
             + 'Dodge: ' + $scope.armorclassDodge() + ', '
             + 'Misc: ' + $scope.armorclassMisc();
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

}]);
