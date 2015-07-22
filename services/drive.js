app.service('DriveService', [function() {

    var service = this;

    var client_id = '<insert client id>';
    var scope = 'https://www.googleapis.com/auth/drive.appfolder';
    var authenticated = false;
    var app_folder_id = null;

    var authenticationCallback = function(result) {
        if (result && result.access_token) {
            console.log('Authentication successful!');
            authenticated = true;
            gapi.client.load('drive', 'v2', driveCallback);
        }
        else {
            console.log('Authentication failed!');
        }
    };

    var driveCallback = function() {
        var request = gapi.client.drive.files.get({
            'fileId': 'appfolder'
        });
        request.execute(function(response) {
            app_folder_id = response.id;
            console.log('App folder ID: ' + response.id);
        });
    };

    service.authenticate = function(immediate) {
        if (authenticated) return;
        gapi.auth.authorize({'client_id': client_id, 'scope': scope, 'immediate': immediate}, authenticationCallback);
    };

    service.isAuthenticated = function() {
        return authenticated;
    }

    service.isConnected = function() {
        return app_folder_id ? true : false;
    }

    service.listFiles = function(callback) {
        var retrievePageOfFiles = function(request, result) {
            request.execute(function(response) {
                result = result.concat(response.items);
                var nextPageToken = response.nextPageToken;
                if (nextPageToken) {
                    request = gapi.client.drive.files.list({
                    'pageToken': nextPageToken
                });
                retrievePageOfFiles(request, result);
                } else {
                    callback(result);
                }
            });
        }
        var initialRequest = gapi.client.drive.files.list({
            'q': '\'' + app_folder_id + '\' in parents'
        });
        retrievePageOfFiles(initialRequest, []);
    };

    service.createFile = function(name, data, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var content_type = 'text/plain';

        var metadata = {
          'title': name,
          'mimeType': content_type,
          'parents': [{'id': app_folder_id}]
        };

        var base64Data = btoa(data);

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + content_type + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

        var request = gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});

        request.execute(callback);
    };

    service.updateFile = function(file, data, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var content_type = 'text/plain';

        var metadata = {
          'title': name,
          'mimeType': content_type,
          'parents': [{'id': app_folder_id}]
        };

        var base64Data = btoa(data);

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + content_type + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

        var request = gapi.client.request({
            'path': '/upload/drive/v2/files/' + file.id,
            'method': 'PUT',
            'params': {'uploadType': 'multipart', 'alt': 'json'},
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});

        request.execute(callback);
    };

    service.getFile = function(file, callback) {
        if (file.downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function() {
                callback(xhr.responseText);
            };
            xhr.onerror = function() {
                callback(null);
            };
            xhr.send();
        } else {
            callback(null);
        }
    };

    service.deleteFile = function(file) {
        var request = gapi.client.drive.files.delete({
            'fileId': file.id
        });
        request.execute(function(response) {
            console.log('File deleted!');
        });
    };

}]);
