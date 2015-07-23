app.service('LocalStorageService', [function() {

    var service = this;

    service.set = function(guid, character) {
        localStorage.setItem(guid, angular.toJson(character));
    };

    service.get = function(guid) {
        var data = localStorage.getItem(guid);
        if (!data) {
            return null;
        }
        return angular.fromJson(data);
    };

    service.list = function() {
        var characters = [];
        for (var i = 0; i < localStorage.length; i++){
            var guid = localStorage.key(i);
            characters.push(guid);
        }
        return characters;
    };

    service.delete = function(guid) {
        localStorage.removeItem(guid);
    };

}]);
