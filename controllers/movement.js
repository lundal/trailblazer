app.controller('MovementController', ['$scope', 'BreakdownService',
function($scope, breakdownService) {

    /* Imported */

    var equipmentLoad = function() {
        if ($scope.shared.equipmentLoad) {
            return $scope.shared.equipmentLoad();
        }
        else {
            return 'Light';
        }
    };

    /* Private */

    $scope.movementTotal = function(movement) {
        var total = 0;

        total += movement.base;
        total += breakdownService.total(movement.misc);
        total += breakdownService.total(movement.temp);

        if (equipmentLoad() != 'Light') {
            if (movement.base > 25) {
                total -= 10;
            }
            else {
                total -= 5;
            }
        }

        return total;
    };

    $scope.movementTotalTooltip = function(movement) {
        var tooltip = '';

        tooltip += 'Base: ' + movement.base + ', ';
        tooltip += 'Misc: ' + breakdownService.total(movement.misc) + ', ';
        tooltip += 'Temp: ' + breakdownService.total(movement.temp);

        if (equipmentLoad() != 'Light') {
            if (movement.base > 25) {
                tooltip += ', Armor: -10';
            }
            else {
                tooltip += ', Armor: -5';
            }
        }

        return tooltip;
    };

    $scope.movementMisc = function(movement) {
        return breakdownService.total(movement.misc);
    };

    $scope.movementMiscTooltip = function(movement) {
        return breakdownService.tooltip(movement.misc);
    };

    $scope.movementMiscEdit = function(movement) {
        breakdownService.open(movement.misc, 'Movement Misc');
    };

    $scope.movementTemp = function(movement) {
        return breakdownService.total(movement.temp);
    };

    $scope.movementTempTooltip = function(movement) {
        return breakdownService.tooltip(movement.temp);
    };

    $scope.movementTempEdit = function(movement) {
        breakdownService.open(movement.temp, 'Movement Temp');
    };

    var cachedBase = -1;
    var cachedMovement = [];

    $scope.movement = function(base) {
        if (base != cachedBase) {
            var movement = [];

            movement.push(buildMovement('Walk', base));
            movement.push(buildMovement('Hustle', base*2));
            movement.push(buildMovement('Run (x3)', base*3));
            movement.push(buildMovement('Run (x4)', base*4));

            cachedMovement = movement;
            cachedBase = base;
        }

        return cachedMovement;
    };

    var buildMovement = function(text, base) {
        return {
            text: text,
            round: base,
            minute: base*10,
            hour: base*0.1,
            day: base*0.8,
        };
    };

}]);
