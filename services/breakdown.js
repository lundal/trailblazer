app.service('BreakdownService', ['$modal', function($modal) {

    var service = this;

    service.open = function(items, title) {
        var modalInstance = $modal.open({
            templateUrl: 'views/breakdown.html',
            controller: 'BreakdownController',
            size: 'sm',
            resolve: {
                items: function() { return items },
                title: function() { return title }
            }
        });
    };

    service.total = function(breakdown) {
        var total = 0;
        for (var i = 0; i < breakdown.length; i++) {
            total += breakdown[i].bonus;
        }
        return total;
    };

    service.max = function(breakdown) {
        var max = -99;
        for (var i = 0; i < breakdown.length; i++) {
            if (breakdown[i].bonus > max) {
                max = breakdown[i].bonus;
            }
        }
        return max;
    };

    service.tooltip = function(breakdown) {
        var tooltip = '';
        for (var i = 0; i < breakdown.length; i++) {
            tooltip += breakdown[i].desc + ": " + breakdown[i].bonus;
            if (i + 1 != breakdown.length) {
                tooltip += ", ";
            }
        }
        return tooltip;
    };

}]);
