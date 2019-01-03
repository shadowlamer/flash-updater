//Server settings
const UPDATER_API_PROTO = 'https:';
const UPDATER_API_HOST = '3voda.money';
const UPDATER_API_PATH_AUTHENTICATE = '/api/authenticate';
const UPDATER_API_PATH_FILES = '/api/files';
const UPDATER_API_PATH_FILES_DOWNLOAD = '/api/files/udownload';

//remote image file identification
const UPDATER_FILE_TIMESTAMP_FIELD = 'timestamp';
const UPDATER_FILE_MIME_FIELD = 'mime';
const UPDATER_FILE_NAME_FIELD = 'name';
const UPDATER_FILE_SIZE_FIELD = 'size';
const UPDATER_IMAGE_MIME = 'application/octet-stream';
const UPDATER_IMAGE_EXTENSION = '.img.bz2';

//local image file
const UPDATER_LOCAL_IMAGE_PATH = 'image'+UPDATER_IMAGE_EXTENSION;
const UPDATER_LOCAL_IMAGE_TEMP_PATH = './downloading';

//file on flash to check
const UPDATER_FLASH_CHECK_PATH = '/orangepi/OrangePiH5.dtb';

//application settings
const UPDATER_FLASH_SCAN_INTERVAL = 5 * 1000; //5 sec
const UPDATER_DOWNLOAD_TIMEOUT = 10 * 60 * 1000; //10 min

module.exports = {
    updater_api_proto:               UPDATER_API_PROTO,
    updater_api_host:                UPDATER_API_HOST,
    updater_api_path_authenticate:   UPDATER_API_PATH_AUTHENTICATE,
    updater_api_path_files:          UPDATER_API_PATH_FILES,
    updater_api_path_files_download: UPDATER_API_PATH_FILES_DOWNLOAD,
    updater_api_url_authenticate:   `${UPDATER_API_PROTO}//${UPDATER_API_HOST}${UPDATER_API_PATH_AUTHENTICATE}`,
    updater_api_url_files:          `${UPDATER_API_PROTO}//${UPDATER_API_HOST}${UPDATER_API_PATH_FILES}`,
    updater_file_timestamp_field:    UPDATER_FILE_TIMESTAMP_FIELD,
    updater_file_mime_field:         UPDATER_FILE_MIME_FIELD,
    updater_file_name_field:         UPDATER_FILE_NAME_FIELD,
    updater_file_size_field:         UPDATER_FILE_SIZE_FIELD,
    updater_image_mime:              UPDATER_IMAGE_MIME,
    updater_image_extension:         UPDATER_IMAGE_EXTENSION,
    updater_local_image_path:        UPDATER_LOCAL_IMAGE_PATH,
    updater_local_image_temp_path:   UPDATER_LOCAL_IMAGE_TEMP_PATH,
    updater_flash_scan_interval:     UPDATER_FLASH_SCAN_INTERVAL,
    updater_download_timeout:        UPDATER_DOWNLOAD_TIMEOUT,
    updater_flash_check_path:        UPDATER_FLASH_CHECK_PATH
};
