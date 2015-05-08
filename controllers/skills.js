app.controller('SkillsController', ['$scope', '$filter', 'BreakdownService', function($scope, $filter, breakdownService) {

    /* Imported */

    var abilityModifierByName = $scope.shared.abilityModifierByName;

    /* Private */

    $scope.skillTotal = function(skill) {
        var total = 0;

        if (skill.ranks > 0 && skill.clas) {
            total += 3;
        }

        total += abilityModifierByName(skill.ability);
        total += skill.ranks;
        total += breakdownService.total(skill.misc);

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
        $scope.character.skills.push({name:'~', clas:false, ability:'Str', ranks:0, misc:[{bonus:0, desc:''}]});
    };

    $scope.skillRemove = function(index) {
        $scope.character.skills.splice(index, 1);

        if ($scope.character.skills.length == 0) {
            $scope.skillAdd();
        }
    };

    $scope.skillSort = function() {
        $scope.character.skills = $filter('orderBy')($scope.character.skills, 'name');
    };

}]);
