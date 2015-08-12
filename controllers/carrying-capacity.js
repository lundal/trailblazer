app.controller('CarryingCapacityController', ['$scope', function($scope) {

    /* Imported */

    var strScore = function() {
        if ($scope.shared.abilityScoreByName) {
            return $scope.shared.abilityScoreByName('str');
        }
        else {
            return 0;
        }
    };

    /* Private */

    var loadLookup = function(str) {
        if (str < 1) {
            return 0;
        }
        if (str < 10) {
            return str * 10;
        }
        switch (str) {
            case 10: return 100;
            case 11: return 115;
            case 12: return 130;
            case 13: return 150;
            case 14: return 175;
            case 15: return 200;
            case 16: return 230;
            case 17: return 260;
            case 18: return 300;
            case 19: return 350;
            default: return 4 * loadLookup(str - 10);
        }
    };

    var sizeMultiplier = function(size, quadruped) {
        if (quadruped == true) {
            switch (size) {
                case 'Colossal': return 24;
                case 'Gargantuan': return 12;
                case 'Huge': return 6;
                case 'Large': return 3;
                case 'Medium': return 1.5;
                case 'Small': return 1;
                case 'Tiny': return 3/4;
                case 'Diminutive': return 1/2;
                case 'Fine': return 1/4;
                default: return 1.5;
            }
        }
        else {
            switch (size) {
                case 'Colossal': return 16
                case 'Gargantuan': return 8;
                case 'Huge': return 4;
                case 'Large': return 2;
                case 'Medium': return 1;
                case 'Small': return 3/4;
                case 'Tiny': return 1/2;
                case 'Diminutive': return 1/4;
                case 'Fine': return 1/8;
                default: return 1;
            }
        }
    }

    var heavyLoad = function(str, size, quadruped) {
    };

    $scope.pushPullLoad = function() {
        return 5 * $scope.heavyLoad();
    }

    $scope.liftLoad = function() {
        return 2 * $scope.heavyLoad();
    }

    $scope.heavyLoad = function() {
        var str = strScore();
        var size = $scope.character.basic.size;
        var quadruped = $scope.character.basic.quadruped;

        var load = loadLookup(str);
        var multiplier = sizeMultiplier(size, quadruped);

        return Math.floor(load * multiplier);
    }

    $scope.mediumLoad = function() {
        return Math.floor(2/3 * $scope.heavyLoad());
    }

    $scope.lightLoad = function() {
        return Math.floor(1/3 * $scope.heavyLoad());
    }

}]);
