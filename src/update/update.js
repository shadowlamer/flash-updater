const EventEmitter = require('events');
const { updateService } = require('./update-service');
const { flashController } = require('../tools/flash');
const {
    updater_local_image_path,
    updater_flash_scan_interval,
    updater_file_timestamp_field,
    updater_file_size_field,
    updater_flash_check_path
} = require('../tools/constants');

class UpdateController extends EventEmitter{

    constructor() {
        super();
        updateService.on('checksuccess',    data => {this.onCheckSuccess(data)});
        updateService.on('checkerror',      data => {this.onCheckError(data)});
        updateService.on('downloadsuccess', data => {this.onDownloadSuccess(data)});
        updateService.on('downloaderror',   data => {this.onDownloadError(data)});
        updateService.on('process',         data => {this.onDownloadProcess(data)});

        flashController.on('write', percent => {this.displayWriteProcess(percent)});
        flashController.on('check', percent => {this.displayVerifyProcess(percent)});
        flashController.on('error', error => {this.onWriteError(error)});
        flashController.on('done', data => {this.onWriteSuccess(data)});
        flashController.on('found', flash => {this.onFlashFound(flash)});

        this.localImage = undefined;
        this.flash = undefined;
        this.isWriting = false;
    }

    init() {
        this.findLocalImage();
        this.findFlash();
        setInterval(() => {this.findFlash()}, updater_flash_scan_interval);
    }

    checkUpdate() {
        updateService.checkUpdate();
    }

    downloadImage(image) {
        if (image) {
            updateService.download(image);
        }
    }

    writeImage() {
        this.isWriting = true;
        flashController.writeImage(this.flash);
    }

    findLocalImage() {
        try {
            let fd = fs.openSync(updater_local_image_path, 'r');
            let stats = fs.fstatSync(fd);
            this.localImage = this.statsToImage(stats)
            this.updateImageStatus(this.localImage);
        } catch (e) {
            this.localImage = undefined;
            this.updateImageStatus(this.localImage);
        }
    }

    statsToImage(stats) {
        let res = {};
        res[updater_file_timestamp_field] = stats.atimeMs / 1000;
        res[updater_file_size_field] = stats.size;
        return res;
    }

    findFlash() {
        if (!this.isWriting)
            flashController.findFlash();
    };

    onFlashFound(flash) {
        this.flash = flash;
        this.updateFlashStatus(this.flash);
    }

    onCheckSuccess(image) {
        this.downloadImage(image);
    }

    onCheckError(data) {
        console.log(data);
    }

    onDownloadProcess(percentage) {
        this.displayDownloadProcess(percentage);
    }

    onDownloadSuccess(image) {
        this.updateImageStatus(image);
    }

    onDownloadError(data) {
        console.log(data);
        this.emit('downloaderror', data);
    }

    onWriteError(data) {
        this.isWriting = false;
        this.emit('writeerror', data);
    }

    onWriteSuccess(data) {
        this.isWriting = false;
        console.log(data);
    }

    updateImageStatus(image) {
        this.emit('image', image);
    }

    updateFlashStatus(flash) {
        this.emit('flash', flash);
    }

    displayDownloadProcess(percentage) {
        this.emit('downloadprocess', percentage);
    }

    displayWriteProcess(percentage) {
        this.emit('writeprocess', percentage);
    }

    displayVerifyProcess(percentage) {
        this.emit('verifyprocess', percentage);
    }
}

module.exports = {
    updateController: new UpdateController()
};
