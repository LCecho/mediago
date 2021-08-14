import { is } from "electron-util";
import { IWindowListItem } from "types/main";
import { Windows } from "./variables";

const windowList = new Map<Windows, IWindowListItem>();

windowList.set(Windows.MAIN_WINDOW, {
  url: is.development
    ? "http://localhost:7789/main"
    : "mediago://electron/index.html/main",
  options(): Electron.BrowserWindowConstructorOptions {
    return {
      width: 800,
      minWidth: 800,
      height: 600,
      minHeight: 600,
      show: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    };
  },
  callback(window) {
    if (is.development) window.webContents.openDevTools();
    window.once("ready-to-show", () => {
      window.show();
    });
  },
});

windowList.set(Windows.BROWSER_WINDOW, {
  url: is.development
    ? "http://localhost:7789/browser"
    : "mediago://electron/index.html/browser",
  options(): Electron.BrowserWindowConstructorOptions {
    return {
      width: 800,
      height: 600,
      show: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    };
  },
  async callback(window) {
    if (is.development) window.webContents.openDevTools();
  },
});

export default windowList;