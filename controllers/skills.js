app.controller('SkillsController', ['$scope', '$filter', 'BreakdownService', function($scope, $filter, breakdownService) {

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

    $scope.skillTotal = function(skill) {
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

    $scope.skillTotalTooltip = function(skill) {
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

    $scope.skillMisc = function(skill) {
        return breakdownService.total(skill.misc);
    };

    $scope.skillMiscTooltip = function(skill) {
        return breakdownService.tooltip(skill.misc);
    };

    $scope.skillMiscEdit = function(skill) {
        breakdownService.open(skill.misc, skill.name + ' Misc');
    };

    $scope.skillAdd = function() {
        /* Tilde is used to make the new skill appear last after sorting */
        $scope.character.skills.push({name:'~', clas:false, ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]});
    };

    var recentlyClicked = [];

    var wasRecentlyClicked = function(id) {
        return (recentlyClicked.indexOf(id) > -1);
    };

    var clicked = function(id) {
        recentlyClicked.push(id);
        setTimeout(function() { removeItem(recentlyClicked, id); }, 1000);
    };

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    $scope.skillRemove = function(skill) {
        if (!wasRecentlyClicked(skill)) {
            clicked(skill);
            return;
        }

        removeItem($scope.character.skills, skill);

        if ($scope.character.skills.length == 0) {
            $scope.skillAdd();
        }
    };

    $scope.skillRemoveStyle = function(skill) {
        if (!wasRecentlyClicked(skill)) {
            return '';
        }
        return 'button-clicked';
    };

    $scope.sort = function() {
        $scope.character.skills = $filter('orderBy')($scope.character.skills, 'name');
    };

}]);
