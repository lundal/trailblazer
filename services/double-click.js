app.service('DoubleClickService', ['$rootScope', function($rootScope) {

    var service = this;

    var recentlyClicked = [];

    var removeItem = function(list, item) {
        var index = list.indexOf(item);
        if (index != -1) {
            list.splice(index, 1);
        }
    };

    service.singleClick = 1;

    service.doubleClick = 2;

    service.wasRecentlyClicked = function(id) {
        return (recentlyClicked.indexOf(id) > -1);
    };

    service.click = function(id) {
        if (!service.wasRecentlyClicked(id)) {
            recentlyClicked.push(id);
            setTimeout(function() {
                removeItem(recentlyClicked, id);

                /* Force scope update */
                if (!$rootScope.$$phase) $rootScope.$digest($rootScope);
            }, 1000);
            return service.singleClick;
        }

        return service.doubleClick;
    };
}]);
