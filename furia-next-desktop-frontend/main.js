const { app, BrowserWindow, Menu } = require('electron');

// Janela principal
var mainWindow = null;
async function createWindow() {
    
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: false,
        icon: __dirname + '/src/img/logo/Furia_Esports_logo.png'
    });

    await mainWindow.loadFile('src/pages/loading/loading.html');
}

// MENU
Menu.setApplicationMenu(null);

// ON READY
app.whenReady().then(createWindow);

// ACTIVATE MAC
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
    {
        createWindow();
    }
});