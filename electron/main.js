import { app, BrowserWindow } from "electron";
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
	});
	mainWindow.setIgnoreMouseEvents(true);
	mainWindow.setAlwaysOnTop(true, "screen");

	const startURL = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;

	mainWindow.loadURL(startURL);

	mainWindow.once("ready-to-show", () => mainWindow.show());
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
	
	// const overlayWindow = new BrowserWindow({
	// 	fullscreen: true,
	// 	frame: false,
	// });
}
app.on("ready", createWindow);
