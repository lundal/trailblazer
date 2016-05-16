app.service('LanguageService', ['$http', function($http) {

    var service = this;

    var languageNames = [];

    service.load = function() {
        $http.get('d20pfsrd/languages/index.json').success(function(data) {
            /* Copy to languageNames */
            var i = data.languages.length;
            while(i--) { languageNames[i] = data.languages[i]; }
            console.log("Language list: Loaded");
        }).error(function(data) {
            console.log("Language list: Failed");
        });
    };

    service.getList = function() {
        return languageNames;
    };

    service.getById = function(id) {
        var language = {};

        var number = "0000" + id;
        number = number.substr(number.length-4);

        $http.get('d20pfsrd/languages/' + number + '.json').success(function(data) {
            for (var key in data) {
                language[key] = data[key];
            }
            console.log('Language loaded: ' + number);
            console.log(trait);
        }).error(function(data) {
            console.log('Language not found: ' + number);
        });

        return language;
    };

    service.getByName = function(name) {
        var id = languageNames.indexOf(name);
        return service.getById(id);
    };

}]);
