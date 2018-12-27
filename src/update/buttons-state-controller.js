const EventEmitter = require('events');

class ButtonsStateController extends EventEmitter {

    constructor() {
        super();
        this._flash = undefined;
        this._image = undefined;
        this.writing = false;
        this.downloading = false;
    }

    startWriting() {
        this.writing = true;
        this.emit('update');
    }

    stopWriting()  {
        this.writing = false;
        this.emit('update');
    }

    startDownloading() {
        this.downloading = true;
        this.emit('update');
    }

    stopDownloading()  {
        this.downloading= false;
        this.emit('update');
    }

    setFlash(value) {
        this._flash = value;
        this.emit('update');
    }

    setImage(value) {
        this._image = value;
        this.emit('update');
    }

    init() {
        this.emit('update');
    }

    getCheckButtonState() {
        return  ((!this.writing) && (!this.downloading));
    }

    getUpdateButtonState() {
        return ((!this.writing) && (!this.downloading) && (this._flash !== undefined) && (this._image !== undefined));
    }
}

module.exports = {
    buttonsStateController: new ButtonsStateController()
}