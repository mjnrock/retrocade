import { app, BrowserWindow, globalShortcut } from "electron";
import isDev from "electron-is-dev";
import path from "path";

function createWindow() {
	const mainWindow = new BrowserWindow({
		fullscreen: true,
		width: 800,
		height: 600,
		show: false,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false
		},
	});
	mainWindow.setIgnoreMouseEvents(true);
	mainWindow.setAlwaysOnTop(true, "screen");
	
	globalShortcut.register("Alt+CommandOrControl+I", () => {
		console.log("Shortcut used in [ MAIN ]");
		mainWindow.webContents.send("test-event", Date.now());
	});

	const startURL = isDev
		? "http://localhost:3000"
		: `file://${path.join(__dirname, "../build/index.html")}`;

	mainWindow.loadURL(startURL);

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
		mainWindow.webContents.openDevTools();
	});
	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// const overlayWindow = new BrowserWindow({
	// 	fullscreen: true,
	// 	frame: false,
	// });
}

app.whenReady()
	// .then(() => {
	// 	globalShortcut.register("Alt+CommandOrControl+I", () => {
	// 		console.log("Electron loves global shortcuts!");
	// 	});
	// })
	.then(createWindow);
