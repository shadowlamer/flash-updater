const $ = require('jquery');
const { loginController } = require('./login');
const { i18n } = require('../tools/i18n');

let loginForm = $('#loginForm');
let loginInput = $('#loginInput');
let passwordInput = $('#passwordInput');
let infoLabel = $('#infoLabel');
let loginButton = $('#loginButton');

displayMessage(i18n.msg('login_welcome'));
loginInput.prop('placeholder', i18n.msg('login_username_placeholder'));
passwordInput.prop('placeholder', i18n.msg('login_password_placeholder'));
loginButton.text(i18n.msg('login_button_text'));

loginForm.submit((event) => {
    event.stopPropagation();
    let username = loginInput.val();
    let password = passwordInput.val();
    displayMessage(i18n.msg('login_credentials_verifying'));
    loginController.login(username, password)
    return false;
});

loginController.on('success', () => {
    displayMessage(i18n.msg('login_success_login'))
});

loginController.on('error', error => {
    if (error === 'Unauthorized')
        displayMessage(i18n.msg('login_wrong_credentials'));
    else
        displayMessage(i18n.msg('login_failed'))
});

function displayMessage(message) {
    infoLabel.text(message);
}

