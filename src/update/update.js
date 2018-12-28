const EventEmitter = require('events');
const { updateService } = require('./update-service');
const { flashController } = require('../tools/flash');
const {
    updater_flash_scan_interval
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
        this.localImage = updateService.findLocalImage();
        this.updateImageStatus(this.localImage);
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
        this.emit('checkerror', data);
    }

    onDownloadProcess(percentage) {
        this.displayDownloadProcess(percentage);
    }

    onDownloadSuccess(image) {
        this.updateImageStatus(image);
    }

    onDownloadError(data) {
        this.emit('downloaderror', data);
    }

    onWriteError(data) {
        this.isWriting = false;
        this.emit('writeerror', data);
    }

    onWriteSuccess(data) {
        this.isWriting = false;
        this.emit('writesuccess', data);
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
