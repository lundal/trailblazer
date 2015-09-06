app.controller('AttacksController', ['$scope', '$filter', 'BreakdownService', 'DoubleClickService',
        function($scope, $filter, breakdownService, doubleClickService) {

    /* Imported */

    var abilityModifierByName = function(abilityName) {
        if ($scope.shared.abilityModifierByName) {
            return $scope.shared.abilityModifierByName(abilityName);
        }
        else {
            return 0;
        }
    }

    var baseAttackBonus = function() {
        if ($scope.shared.baseAttackBonus) {
            return $scope.shared.baseAttackBonus();
        }
        else {
            return 0;
        }
    }

    /* Private */

    $scope.attacks = function(attack) {
        var firstAttack = baseAttackBonus() + abilityModifierByName(attack.ability) + attack.bonus;
        var attacks = "" + firstAttack;

        var negativeBAB = 0 - baseAttackBonus();
        for (var i = -5; i > negativeBAB; i -= 5) {
            attacks += " / " + (firstAttack + i);
        }

        return attacks;
    };

    $scope.attacksTooltip = function(attack) {
        var tooltip = '';

        tooltip += 'BAB' + ': ' + baseAttackBonus() + ', ';
        tooltip += attack.ability + ': ' + abilityModifierByName(attack.ability) + ', ';
        tooltip += 'Attack Bonus' + ': ' + attack.bonus;

        return tooltip;
    };

    $scope.add = function() {
        /* Tilde is used to make the new entry appear last after sorting */
        $scope.character.attacks.push({weapon:'~', bonus:0, ability:'Str', damage:'', critical:'20x2', type:'', range:0, notes:''});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(attack) {
        if (doubleClickService.click(attack) == doubleClickService.doubleClick) {
            removeItem($scope.character.attacks, attack);

            if ($scope.character.attacks.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(attack) {
        if (doubleClickService.wasRecentlyClicked(attack)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function() {
        $scope.character.attacks = $filter('orderBy')($scope.character.attacks, 'weapon');
    };

}]);

