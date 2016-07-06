app.controller('SkillsController', ['$scope', '$filter', 'BreakdownService', 'DoubleClickService',
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

    var checkPenalty = function() {
        if ($scope.shared.equipmentCheckPenalty) {
            return $scope.shared.equipmentCheckPenalty();
        }
        else {
            return 0;
        }
    }

    /* Private */

    $scope.total = function(skill) {
        var total = 0;

        if (skill.ranks > 0 && skill.clas) {
            total += 3;
        }

        total += abilityModifierByName(skill.ability);
        total += skill.ranks;
        total += breakdownService.total(skill.misc);

        if (skill.ability == 'Str' || skill.ability == 'Dex') {
            total -= checkPenalty();
        }

        return total;
    };

    $scope.totalTooltip = function(skill) {
        var tooltip = '';

        if (skill.ranks > 0 && skill.clas) {
            tooltip += 'Class: 3, ';
        }

        tooltip += skill.ability + ': ' + abilityModifierByName(skill.ability) + ', ';
        tooltip += 'Ranks: ' + skill.ranks + ', ';
        tooltip += 'Misc: ' + breakdownService.total(skill.misc);

        if (skill.ability == 'Str' || skill.ability == 'Dex') {
            tooltip += ', Check Penalty: ' + checkPenalty();
        }

        return tooltip;
    };

    $scope.misc = function(skill) {
        return breakdownService.total(skill.misc);
    };

    $scope.miscTooltip = function(skill) {
        return breakdownService.tooltip(skill.misc);
    };

    $scope.miscEdit = function(skill) {
        breakdownService.open(skill.misc, skill.name + ' Misc');
    };

    $scope.add = function() {
        /* Tilde is used to make the new skill appear last after sorting */
        $scope.character.skills.push({name:'~', clas:false, ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]});
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.remove = function(skill) {
        if (doubleClickService.click(skill) == doubleClickService.doubleClick) {
            removeItem($scope.character.skills, skill);

            if ($scope.character.skills.length == 0) {
                $scope.add();
            }
        }
    };

    $scope.removeStyle = function(skill) {
        if (doubleClickService.wasRecentlyClicked(skill)) {
            return 'button-recently-clicked';
        }
        else {
            return '';
        }
    };

    $scope.sort = function() {
        $scope.character.skills = $filter('orderBy')($scope.character.skills, 'name');
    };

}]);
