var svcStorageDrive = function() {
    var service = {};

    var saveCache = null;
    var fileCache = [];

    var lookupFileCache = function(guid) {
        for (var i = 0; i < fileCache.length; i++) {
            var file = fileCache[i];
            if (file.title == guid) {
                return file;
            }
        }
        return null;
    };

    var refreshFileCache = function(callback) {
        svcDrive.listFiles(function(files) {
            fileCache = files;
            callback(true);
        });
    };

    service.init = function(immediate, callback) {
        svcDrive.connect(immediate, function(success) {
            if (!success) {
                callback(false);
            }
            else {
                refreshFileCache(callback);
            }
        });
    };

    service.set = function(guid, character, callback) {
        var data = JSON.stringify(character);
        if (data == saveCache) {
            callback(true);
        }
        else {
            saveCache = data;

            var file = lookupFileCache(guid);
            if (file == null) {
                svcDrive.createFile(guid, data, function(file) {
                    console.log('DriveStorage: Created ' + guid);
                    fileCache.push(file);
                    callback(true);
                });
            }
            else {
                svcDrive.updateFile(file, data, function(file) {
                    console.log('DriveStorage: Updated ' + guid);
                    callback(true);
                });
            }
        }
    };

    service.get = function(guid, callback) {
        var file = lookupFileCache(guid);
        if (file == null) {
            callback(null);
        }
        else {
            svcDrive.getFile(file, function(data) {
                console.log('DriveStorage: Got ' + guid);
                var character = JSON.parse(data);
                callback(character);
            });
        }
    };

    service.list = function(callback) {
        refreshFileCache(function(success) {
            var guids = [];
            for (var i = 0; i < fileCache.length; i++) {
                var guid = fileCache[i].title;
                guids.push(guid);
            }
            callback(guids);
        });
    };

    service.delete = function(guid, callback) {
        var file = lookupFileCache(guid);
        svcDrive.deleteFile(file, function(response) {
            callback(true);
        });
    };

    return service;
}();
