const $ = require('jquery');
const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');
const { remote } = require('electron')
const {
    updater_api_path_files,
    updater_file_timestamp_field,
    updater_file_mime_field,
    updater_file_name_field,
    updater_image_mime,
    updater_image_extension,
    updater_local_image_path,
    updater_local_image_temp_path,
    updater_api_host
} = require('../tools/constants');

class UpdateService extends EventEmitter{

    constructor() {
        super();
        this.token = remote.getGlobal( 'token' );
    }

    checkUpdate() {
        $.ajax({
            type: "GET",
            url: updater_api_path_files,
            success: data => {this.onCheckSuccess(data)},
            error:   data => {this.emit('checkerror', data)},
            contentType: 'application/json',
            headers: {Authorization: 'Bearer ' + this.token}
        });
    }

    download(image) {
        let totalBytes = image.size;
        let loadedBytes = 0;
        let file = fs.createWriteStream(updater_local_image_temp_path);
        let options = {host: updater_api_host, port: 80, path: '/api/files/udownload/'+image.id,
            headers: {Authorization: 'Bearer ' + this.token}, timeout: 600000};
        let request = http.get(options, response => {
            response.pipe(file);
            response.on("data", chunk => {
                loadedBytes += +chunk.length;
                let percentage = ((loadedBytes / totalBytes) * 100.0).toFixed(2);
                this.onDownloadProcess(percentage);
            });
            response.on("end", () => {this.onDownloadSuccess()});
            request.on("error", data => {this.onDownloadError(data)});
        });
    }

    onDownloadProcess(percentage) {
        this.emit('process', percentage);
    }

    onCheckSuccess(data) {
        let image = data
            .sort((a,b) => (b[updater_file_timestamp_field] - a[updater_file_timestamp_field]))
            .find(file => (file[updater_file_mime_field] === updater_image_mime &&
                file[updater_file_name_field].includes(updater_image_extension)
            ));
        this.emit('checksuccess', image);
    }

    onDownloadSuccess(data) {
        fs.rename(updater_local_image_temp_path, updater_local_image_path, err => {
            if (!err)
                this.emit('downloadsuccess', data);
            else
                this.emit('downloaderror', err);
        });
    }

    onCheckError(data) {
        this.emit('checkerror', data);
    }

    onDownloadError(data) {
        this.emit('downloaderror', data);
    }

}

module.exports = {
    updateService: new UpdateService()
};
