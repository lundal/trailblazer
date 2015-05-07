app.service('FeatService', ['$http', function($http) {

    var service = this;

    var featNames = [];

    service.load = function() {
        $http.get('d20pfsrd/feats/index.json').success(function(data) {
            /* Copy to featNames */
            var i = data.feats.length;
            while(i--) { featNames[i] = data.feats[i]; }
            console.log("Feat list: Loaded");
        }).error(function(data) {
            console.log("Feat list: Failed");
        });
    };

    service.getList = function() {
        return featNames;
    };

    service.getById = function(id) {
        var feat = {};

        var number = "0000" + id;
        number = number.substr(number.length-4);

        $http.get('d20pfsrd/feats/' + number + '.json').success(function(data) {
            for (var key in data) {
                feat[key] = data[key];
            }
            console.log('Feat loaded: ' + number);
            console.log(feat);
        }).error(function(data) {
            console.log('Feat not found: ' + number);
        });

        return feat;
    };

    service.getByName = function(name) {
        var id = featNames.indexOf(name);
        return service.getById(id);
    };

}]);
