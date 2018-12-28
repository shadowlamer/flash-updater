// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require('jquery');
const moment = require('moment');
const { updater_file_timestamp_field } = require('../tools/constants');
const { updateController } = require('./update');
const { buttonsStateController } = require('./buttons-state-controller');

const checkLabel = $('#checkLabel');
const updateLabel = $('#updateLabel');
const checkButton = $('#checkButton');
const updateButton = $('#updateButton');

updateController.on('image', image => {updateImageStatus(image)});
updateController.on('flash', flash => {updateFlashStatus(flash)});
updateController.on('downloadprocess', percentage => {displayDownloadProcess(percentage)});
updateController.on('writeprocess', percentage => {displayWriteProcess(percentage)});
updateController.on('verifyprocess', percentage => {displayVerifyProcess(percentage)});
updateController.on('checkerror', error => {displayCheckError(error)});
updateController.on('downloaderror', error => {displayDownloadError(error)});
updateController.on('writeerror', error => {displayWriteError(error)});

buttonsStateController.on('update', () => {updateButtonsStates()})

updateController.init();
buttonsStateController.init();

checkButton.click( () => {
    buttonsStateController.startDownloading()
    updateController.checkUpdate();
});

updateButton.click( () => {
    buttonsStateController.startWriting()
    updateController.writeImage();
});

function updateImageStatus(image) {
    if (image) {
        let imgDate = moment(image[updater_file_timestamp_field], 'X').format('DD/MM/YYYY');
        checkLabel.text(`Обнаружено обновление за ${imgDate}`);
    } else {
        checkLabel.text('Обновлений не обнаружено.');
    }
    buttonsStateController.setImage(image);
    buttonsStateController.stopDownloading();
}

function updateFlashStatus(flash) {
    if (!flash) {
        updateLabel.text('Не вставлен носитель.');
    } else {
        updateLabel.text(`Обнаружен носитель на диске ${flash.mountpoint}`);
    }
    buttonsStateController.setFlash(flash);
    buttonsStateController.stopWriting();
}

function displayDownloadProcess(percentage) {
    checkLabel.text(`Загрузка. Выполнено ${percentage}%.`);
}

function displayWriteProcess(percentage) {
    updateLabel.text(`Обновление. Выполнено ${percentage}%.`);
}

function displayVerifyProcess(percentage) {
    updateLabel.text(`Проверка. Выполнено ${percentage}%.`);
}

function updateButtonsStates() {
    checkButton.prop( "disabled", !buttonsStateController.getCheckButtonState());
    updateButton.prop( "disabled", !buttonsStateController.getUpdateButtonState());
}

function displayCheckError(error) {
    checkLabel.text(`Не удалось проверить обновления.`);
    buttonsStateController.stopDownloading();
}

function displayDownloadError(error) {
    checkLabel.text(`Не удалось загрузить обновление.`);
    buttonsStateController.stopDownloading();
}

function displayWriteError(error) {
    updateLabel.text(`Не удалось обновить ПО.`);
    buttonsStateController.stopWriting()
}
