const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
Menu.setApplicationMenu(null);
function createWindow() {
    const win = new BrowserWindow({
        width: 1400, height: 850,
        minWidth: 1100, minHeight: 700,
        title: "My Telegram",
        backgroundColor: '#0e1621',
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    });
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });