const messages = {
    ru: {
        //Common
        common_date_format: 'DD/MM/YYYY',
        common_app_title: 'Обновление ПО',
        //Login view
        login_welcome: 'Для начала работы нужно войти в систему.',
        login_credentials_verifying: 'Данные проверяются. Подождите...',
        login_success_login: 'Успешный вход.',
        login_failed: 'Не удалось войти в систему.',
        login_wrong_credentials: 'Неправильно введен email или пароль.',
        login_username_placeholder: 'Введите email',
        login_password_placeholder: 'Введите пароль',
        login_button_text: "Войти",
        //Update view
        update_found_update: 'Обнаружено обновление за',
        update_found_media: 'Обнаружен носитель на диске',
        update_update_not_found: 'Обновлений не обнаружено.',
        update_media_not_found: 'Не вставлен носитель.',
        update_downloading_progress: 'Загрузка. Выполнено',
        update_writing_progress: 'Обновление. Выполнено',
        update_verifying_progress: 'Проверка. Выполнено',
        update_check_error: 'Не удалось проверить обновления.',
        update_download_error: 'Не удалось загрузить обновление.',
        update_write_error: 'Не удалось обновить ПО.',
        update_check_btn_label: 'Проверить обновления',
        update_update_btn_label: 'Обновить ПО',
        update_check_message: 'Поиск обновлений...',
        update_media_message: 'Поиск носителя...'
    },
    en: {
        //Common
        common_date_format: 'DD/MM/YYYY',
        common_app_title: 'Flash image downloader',
        //Login view
        login_welcome: 'You must login before process.',
        login_credentials_verifying: 'Verifying credentials. Wait...',
        login_success_login: 'Login success.',
        login_failed: 'Login failed',
        login_wrong_credentials: 'Wrong credentials',
        login_username_placeholder: 'Enter email',
        login_password_placeholder: 'Enter password',
        login_button_text: "Login",
        //Update view
        update_found_update: 'Found update since',
        update_found_media: 'Found media at',
        update_update_not_found: 'Update not found.',
        update_media_not_found: 'Media not found.',
        update_downloading_progress: 'Downloading. Progress:',
        update_writing_progress: 'Writing. Progress:',
        update_verifying_progress: 'Verifying. Progress:',
        update_check_error: 'Can\'t check updates.',
        update_download_error: 'Can\'t download update.',
        update_write_error: 'Can\'t write image',
        update_check_btn_label: 'Check updates',
        update_update_btn_label: 'Write image',
        update_check_message: 'Checking updates...',
        update_media_message: 'Checking media...'
    }
};

class I18N {

    constructor() {
        this.currentLang = 'en';
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
};