app.controller('EquipmentController', ['$scope', function($scope) {

    /* Private */

    var armor = $scope.character.equipment.armor;
    var shield = $scope.character.equipment.shield;

    $scope.shieldMaxDex = function() {
        if (shield.type == 'Tower') {
            return '2';
        }
        else {
            return '–';
        }
    };

    /* Shared */

    $scope.shared.equipmentArmorClass = function() {
        var armorclass = 0;
        if (armor.equipped == 'Yes') {
            armorclass += armor.armorclass;
        }
        if (shield.equipped == 'Yes') {
            armorclass += shield.armorclass;
        }
        return armorclass;
    };

    $scope.shared.equipmentMaxDex = function() {
        var maxdex = 999;
        if (armor.equipped == 'Yes') {
            maxdex = armor.maxdex;
        }
        if (shield.equipped == 'Yes' && shield.type == 'Tower') {
            maxdex = Math.min(maxdex, 2);
        }
        return maxdex;
    };

    $scope.shared.equipmentCheckPenalty = function() {
        var checkpenalty = 0;
        if (armor.equipped == 'Yes') {
            checkpenalty += armor.checkpenalty;
        }
        if (shield.equipped == 'Yes') {
            checkpenalty += shield.checkpenalty;
        }
        return checkpenalty;
    };

    $scope.shared.equipmentSpellFailure = function() {
        var spellfailure = 0;
        if (armor.equipped == 'Yes') {
            spellfailure += armor.spellfailure;
        }
        if (shield.equipped == 'Yes') {
            spellfailure += shield.spellfailure;
        }
        return spellfailure;
    };

}]);
