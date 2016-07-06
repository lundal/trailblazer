app.controller('EquipmentController', ['$scope', function($scope) {

    /* Private */

    var getArmor = function() {
        return $scope.character.equipment.armor;
    };

    var getShield = function() {
        return $scope.character.equipment.shield;
    };

    $scope.shieldMaxDex = function() {
        if (getShield().type == 'Tower') {
            return '2';
        }
        else {
            return '–';
        }
    };

    /* Shared */

    $scope.shared.equipmentArmorClass = function() {
        var armorclass = 0;
        if (getArmor().equipped == 'Yes') {
            armorclass += getArmor().armorclass;
        }
        if (getShield().equipped == 'Yes') {
            armorclass += getShield().armorclass;
        }
        return armorclass;
    };

    $scope.shared.equipmentMaxDex = function() {
        var maxdex = 999;
        if (getArmor().equipped == 'Yes') {
            maxdex = getArmor().maxdex;
        }
        if (getShield().equipped == 'Yes' && getShield().type == 'Tower') {
            maxdex = Math.min(maxdex, 2);
        }
        return maxdex;
    };

    $scope.shared.equipmentCheckPenalty = function() {
        var checkpenalty = 0;
        if (getArmor().equipped == 'Yes') {
            checkpenalty += getArmor().checkpenalty;
        }
        if (getShield().equipped == 'Yes') {
            checkpenalty += getShield().checkpenalty;
        }
        return checkpenalty;
    };

    $scope.shared.equipmentSpellFailure = function() {
        var spellfailure = 0;
        if (getArmor().equipped == 'Yes') {
            spellfailure += getArmor().spellfailure;
        }
        if (getShield().equipped == 'Yes') {
            spellfailure += getShield().spellfailure;
        }
        return spellfailure;
    };

    $scope.shared.equipmentLoad = function() {
        if (getArmor().equipped == 'Yes') {
            return getArmor().type;
        }
        return 'Light';
    };

}]);
