var svcD20PFSRD = function(type) {
    var service = {};

    var names = [];

    service.init = function() {
        $.get('d20pfsrd/' + type + '/index.json')
        .done(function(data) {
            /* Copy to names */
            var i = data[type].length;
            while (i--) { names[i] = data[type][i]; }
            console.log('D20PFSRD: Loaded list of ' + type);
        })
        .fail(function(data) {
            console.log('D20PFSRD: Failed to load list of ' + type);
        });
    };

    service.getList = function() {
        return spellNames;
    };

    service.getById = function(id) {
        var item = {};

        var number = "0000" + id;
        number = number.substr(number.length-4);

        $.get('d20pfsrd/' + type + '/' + number + '.json')
        .done(function(data) {
            for (var key in data) {
                item[key] = data[key];
            }
            console.log('D20PFSRD: Loaded ' + number + ' from ' + type);
            console.log(item);
        })
        .fail(function(data) {
            console.log('D20PFSRD: Failed to load ' + number + ' from ' + type);
        });

        return item;
    };

    service.getByName = function(name) {
        var id = names.indexOf(name);
        return service.getById(id);
    };

    return service;
};

// Types
var svcFeat = svcD20PFSRD('feats');
var svcSpell = svcD20PFSRD('spells');
var svcTrait = svcD20PFSRD('traits');
var svcLanguage = svcD20PFSRD('languages');
