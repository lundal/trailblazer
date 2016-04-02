app.controller('EquipmentController', ['$scope', function($scope) {

    /* Private */

    var getArmor = function() {
        return $scope.character.equipment.armor;
    };

    var getShield = function() {
        return $scope.character.equipment.shield;
    };

    $scope.shieldMaxDex = function() {
        if (shield().type == 'Tower') {
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
        if (shield().equipped == 'Yes') {
            armorclass += shield().armorclass;
        }
        return armorclass;
    };

    $scope.shared.equipmentMaxDex = function() {
        var maxdex = 999;
        if (getArmor().equipped == 'Yes') {
            maxdex = getArmor().maxdex;
        }
        if (shield().equipped == 'Yes' && shield().type == 'Tower') {
            maxdex = Math.min(maxdex, 2);
        }
        return maxdex;
    };

    $scope.shared.equipmentCheckPenalty = function() {
        var checkpenalty = 0;
        if (getArmor().equipped == 'Yes') {
            checkpenalty += getArmor().checkpenalty;
        }
        if (shield().equipped == 'Yes') {
            checkpenalty += shield().checkpenalty;
        }
        return checkpenalty;
    };

    $scope.shared.equipmentSpellFailure = function() {
        var spellfailure = 0;
        if (getArmor().equipped == 'Yes') {
            spellfailure += getArmor().spellfailure;
        }
        if (shield().equipped == 'Yes') {
            spellfailure += shield().spellfailure;
        }
        return spellfailure;
    };

}]);
