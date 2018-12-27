const EventEmitter = require('events');
const { ipcRenderer } = require('electron')
const { loginService } = require('./login-service');

class LoginController extends EventEmitter{


    constructor() {
        super();
        loginService.on('success', data => this.onSuccess(data));
        loginService.on('error',   data => this.onError(data));
    }

    login(username, password) {
        loginService.login(username, password);
    }

    onError(data) {
        this.emit('error', data.statusText)
    }

    onSuccess(data) {
        this.emit('success', data);
        ipcRenderer.send( "setToken", data.id_token );
        ipcRenderer.send( "go", 'update' );
    }
}

module.exports = {
    loginController: new LoginController()
};
