const EventEmitter = require('events');
const fs = require('fs');
const DrivelistScanner = require('drivelist-scanner');
const imageWrite = require('resin-image-write');
const bz2 = require('unbzip2-stream');
const {
    updater_local_image_path,
    updater_flash_check_path
} = require('../tools/constants');

class FlashController extends EventEmitter{

    writeImage(flash) {
        if (flash) {
            let myStream = fs.createReadStream(updater_local_image_path);
            let emitter = imageWrite.write(flash.device, myStream, {
                check: true,
                transform: bz2(),
                size: fs.statSync(imagePath).size
            });
            emitter.on('progress', state => {this.emit(state.type, (+state.percentage).toFixed(2))});
            emitter.on('error', error => {this.emit('error', error)});
            emitter.on('done', data => {this.emit('done', data)});
        }
    }

    findFlash() {
        DrivelistScanner.getDrives().then((drives) => {
            this.emit ('found', drives
                .filter(drive => {
                let checkPath = drive.mountpoint + updater_flash_check_path;
                try {
                    fs.openSync(checkPath, 'r');
                    return true; //flash found
                } catch (e) {
                    return false; //drive not exists
                }
            })
                .find(() => (true)));
        });
    };
}

module.exports = {
    flashController: new FlashController()
}