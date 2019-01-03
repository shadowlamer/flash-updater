// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require('jquery');
const moment = require('moment');
const { updater_file_timestamp_field } = require('../tools/constants');
const { updateController } = require('./update');
const { buttonsStateController } = require('./buttons-state-controller');
const { i18n } = require('../tools/i18n');

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

buttonsStateController.on('update', () => {updateButtonsStates()});

checkButton.text(i18n.msg('update_check_btn_label'));
updateButton.text(i18n.msg('update_update_btn_label'));
checkLabel.text(i18n.msg('update_check_message'));
updateLabel.text(i18n.msg('update_media_message'));

updateController.init();
buttonsStateController.init();

checkButton.click( () => {
    buttonsStateController.startDownloading();
    updateController.checkUpdate();
});

updateButton.click( () => {
    buttonsStateController.startWriting();
    updateController.writeImage();
});

function updateImageStatus(image) {
    if (image) {
        let imgDate = moment(image[updater_file_timestamp_field], 'X').format(i18n.msg('common_date_format'));
        console.log(`${i18n.msg('update_found_update')} ${imgDate}`);
        checkLabel.text(`${i18n.msg('update_found_update')} ${imgDate}`);
    } else {
        checkLabel.text(i18n.msg('update_update_not_found'));
    }
    buttonsStateController.setImage(image);
    buttonsStateController.stopDownloading();
}

function updateFlashStatus(flash) {
    if (!flash) {
        updateLabel.text(i18n.msg('update_media_not_found'));
    } else {
        updateLabel.text(`${i18n.msg('update_found_media')} ${flash.mountpoint}`);
    }
    buttonsStateController.setFlash(flash);
    buttonsStateController.stopWriting();
}

function displayDownloadProcess(percentage) {
    checkLabel.text(`${i18n.msg('update_downloading_progress')} ${percentage}%.`);
}

function displayWriteProcess(percentage) {
    updateLabel.text(`${i18n.msg('update_writing_progress')} ${percentage}%.`);
}

function displayVerifyProcess(percentage) {
    updateLabel.text(`${i18n.msg('update_verifying_progress')} ${percentage}%.`);
}

function updateButtonsStates() {
    checkButton.prop( "disabled", !buttonsStateController.getCheckButtonState());
    updateButton.prop( "disabled", !buttonsStateController.getUpdateButtonState());
}

function displayCheckError(error) {
    console.error(error);
    checkLabel.text(i18n.msg('update_check_error'));
    buttonsStateController.stopDownloading();
}

function displayDownloadError(error) {
    console.error(error);
    checkLabel.text(i18n.msg('update_download_error'));
    buttonsStateController.stopDownloading();
}

function displayWriteError(error) {
    console.error(error);
    updateLabel.text(i18n.msg('update_write_error'));
    buttonsStateController.stopWriting()
}
