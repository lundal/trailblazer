var svcBreakdown = function() {
    var service = {};

    var service = this;

    service.open = function(items, title) {
        /*
        TODO
        var modalInstance = $modal.open({
            templateUrl: 'views/breakdown.html',
            controller: 'BreakdownController',
            size: 'sm',
            resolve: {
                items: function() { return items },
                title: function() { return title }
            }
        });
        */
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
            if (breakdown[i].bonus == 0) {
                continue;
            }
            tooltip += breakdown[i].desc + ": " + breakdown[i].bonus + ", ";
        }
        // Trim last ,
        if (tooltip.length > 1) {
            tooltip = tooltip.slice(0, -2);
        }
        return tooltip;
    };

    return service;
}();
