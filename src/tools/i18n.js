const messages = {
    ru: {
        login_welcome: 'Для начала работы нужно войти в систему.',
        login_credentials_verifying: 'Данные проверяются. Подождите...',
        login_success_login: 'Успешный вход.',
        login_failed: 'Не удалось войти в систему.',
        login_wrong_credentials: 'Неправильно введен email или пароль.',
        login_username_placeholder: 'Введите email',
        login_password_placeholder: 'Введите пароль',
        login_button_text: "Войти"
    },
    en: {
        login_welcome: 'You must login before process.',
        login_credentials_verifying: 'Verifying credentials. Wait...',
        login_success_login: 'Login success.',
        login_failed: 'Login failed',
        login_wrong_credentials: 'Wrong credentials',
        login_username_placeholder: 'Enter email',
        login_password_placeholder: 'Enter password',
        login_button_text: "Login"
    }
};

class I18N {

    constructor() {
        this.currentLang = 'ru';
    }

    setLang(lang) {
        this.currentLang = lang;
    }

    msg(key) {
        return messages[this.currentLang][key];
    }

}

module.exports = {
    i18n: new I18N()
}