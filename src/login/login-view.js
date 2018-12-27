const $ = require('jquery');
const { loginController } = require('./login');

let loginForm = $('#loginForm');
let loginInput = $('#loginInput');
let passwordInput = $('#passwordInput');
let infoLabel = $('#infoLabel');

loginForm.submit((event) => {
    event.stopPropagation();
    let username = loginInput.val();
    let password = passwordInput.val();
    displayMessage('Данные проверяются. Подождите...')
    loginController.login(username, password)
    return false;
});

loginController.on('success', () => {
    displayMessage('Успешный вход.')
});

loginController.on('error', error => {
    if (error === 'Unauthorized')
        displayMessage('Неправильно введен email или пароль.')
    else
        displayMessage('Не удалось войти в систему.')
});

function displayMessage(message) {
    infoLabel.text(message);
}

