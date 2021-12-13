import { app, BrowserWindow, globalShortcut } from "electron";
import isDev from "electron-is-dev";
import path from "path";

function createWindow() {
	const config = {
		devOpen: true,
	};
	const mainWindow = new BrowserWindow({
		fullscreen: true,
		width: 1280,
		height: 720,
		show: false,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
			webSecurity: false
		},
	});
	// mainWindow.setIgnoreMouseEvents(true);
	// mainWindow.setAlwaysOnTop(true, "screen");
	
	globalShortcut.register("CommandOrControl+Space", () => {
		console.log("Shortcut used in [ MAIN ]");
		mainWindow.webContents.send("test-event", Date.now());
	});
	globalShortcut.register("CommandOrControl+F12", () => {
		console.log("F12 used in [ MAIN ]");
		
		if(config.devOpen) {
			mainWindow.webContents.closeDevTools();
		} else {
			mainWindow.webContents.openDevTools();
		}
		config.devOpen = !config.devOpen;
	});

	const startURL = isDev
		? `http://localhost:3000`
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
