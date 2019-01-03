// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron');
const { i18n } = require('./src/tools/i18n');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on( "setToken", ( event, token ) => {
  global.token = token;
} );

ipcMain.on( "go", ( event, view ) => {
    go(view);
} );

function go(view) {
    mainWindow.loadFile(`./src/${view}/${view}.html`);
}

function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 470});
  mainWindow.setTitle(i18n.msg('common_app_title'));
  go('login');

  //  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
