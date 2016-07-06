app.service('SpellService', ['$http', function($http) {

    var service = this;

    var spellNames = [];

    service.load = function() {
        $http.get('d20pfsrd/spells/index.json').success(function(data) {
            /* Copy to spellNames */
            var i = data.spells.length;
            while(i--) { spellNames[i] = data.spells[i]; }
            console.log("Spell list: Loaded");
        }).error(function(data) {
            console.log("Spell list: Failed");
        });
    };

    service.getList = function() {
        return spellNames;
    };

    service.getById = function(id) {
        var spell = {};

        var number = "0000" + id;
        number = number.substr(number.length-4);

        $http.get('d20pfsrd/spells/' + number + '.json').success(function(data) {
            for (var key in data) {
                spell[key] = data[key];
            }
            console.log('Spell loaded: ' + number);
            console.log(spell);
        }).error(function(data) {
            console.log('Spell not found: ' + number);
        });

        return spell;
    };

    service.getByName = function(name) {
        var id = spellNames.indexOf(name);
        return service.getById(id);
    };

}]);
