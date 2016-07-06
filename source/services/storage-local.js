var svcStorageLocal = function() {
    var service = {};

    service.init = function(callback) {
        var success = typeof(Storage) !== "undefined";
        callback(success);
    };

    service.set = function(guid, character, callback) {
        localStorage.setItem(guid, JSON.stringify(character));
        var success = true;
        callback(success);
    };

    service.get = function(guid, callback) {
        var data = localStorage.getItem(guid);
        if (!data) {
            callback(null);
        }
        else {
            var character = JSON.parse(data);
            callback(character);
        }
    };

    service.list = function(callback) {
        var guids = [];
        for (var i = 0; i < localStorage.length; i++){
            var guid = localStorage.key(i);
            guids.push(guid);
        }
        callback(guids);
    };

    service.delete = function(guid, callback) {
        localStorage.removeItem(guid);
        var success = true;
        callback(success);
    };

    return service;
}();
