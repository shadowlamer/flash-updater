const $ = require('jquery');
const EventEmitter = require('events');
const { updater_api_url_authenticate } = require('../tools/constants');

class LoginService extends EventEmitter{

    constructor() {
        super();
    }

    login(username, password) {
        let query = {
            username: username,
            password: password
        };
        $.ajax({
            type: "POST",
            url: updater_api_url_authenticate,
            data: JSON.stringify(query),
            success: data => {this.emit('success', data)},
            error:   data => {this.emit('error', data)},
            contentType: 'application/json'
        });
    }
}

module.exports = {
    loginService: new LoginService()
};