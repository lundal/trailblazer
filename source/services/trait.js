app.service('TraitService', ['$http', function($http) {

    var service = this;

    var traitNames = [];

    service.load = function() {
        $http.get('d20pfsrd/traits/index.json').success(function(data) {
            /* Copy to traitNames */
            var i = data.traits.length;
            while(i--) { traitNames[i] = data.traits[i]; }
            console.log("Trait list: Loaded");
        }).error(function(data) {
            console.log("Trait list: Failed");
        });
    };

    service.getList = function() {
        return traitNames;
    };

    service.getById = function(id) {
        var trait = {};

        var number = "0000" + id;
        number = number.substr(number.length-4);

        $http.get('d20pfsrd/traits/' + number + '.json').success(function(data) {
            for (var key in data) {
                trait[key] = data[key];
            }
            console.log('Trait loaded: ' + number);
            console.log(trait);
        }).error(function(data) {
            console.log('Trait not found: ' + number);
        });

        return trait;
    };

    service.getByName = function(name) {
        var id = traitNames.indexOf(name);
        return service.getById(id);
    };

}]);
