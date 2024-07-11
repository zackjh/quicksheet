import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  IpcMainEvent,
} from 'electron';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Declare webpack constants for entry points
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 800,
    icon: './build/icons/png/512x512.png',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    minWidth: 600,
    minHeight: 600,
  });

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools if needed.
  // mainWindow.webContents.openDevTools();

  // Handle context menu for spelling suggestions and dictionary
  mainWindow.webContents.on('context-menu', (event, params) => {
    const menu = new Menu();
    let menuItemsAdded = false;

    const replaceMisspelling = (suggestion: string) => {
      mainWindow?.webContents.replaceMisspelling(suggestion);
    };

    // Add each spelling suggestion
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(
        new MenuItem({
          label: suggestion,
          click: () => replaceMisspelling(suggestion),
        })
      );
      menuItemsAdded = true;
    }

    // Allow users to add the misspelled word to the dictionary
    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: 'Add to dictionary',
          click: () =>
            mainWindow?.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            ),
        })
      );
      menuItemsAdded = true;
    }

    // Display the menu only if items were added
    if (menuItemsAdded) {
      menu.popup();
    }
  });

  // Handle window closed event
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

function handlePrintAsPDF(event: IpcMainEvent, htmlContent: string) {
  console.log('handlePrintAsPDF in the main process was fired!');
  console.log(htmlContent);

  const printWindow = new BrowserWindow({ show: false });
  printWindow.loadURL(`data:text/html,${encodeURIComponent(htmlContent)}`);

  const pdfPath = path.join(os.homedir(), 'Desktop', 'testing_again.pdf');
  const options = {};

  printWindow.webContents.on('did-finish-load', async () => {
    console.log('did-finish-load did indeed fire.');

    const pdfBuffer = await printWindow.webContents.printToPDF(options);

    fs.writeFile(pdfPath, pdfBuffer, (error) => {
      if (error) {
        console.error(`Failed to write PDF to ${pdfPath}: `, error);
      } else {
        console.log(`Wrote PDF successfully to ${pdfPath}`);
      }
    });

    printWindow.close();
  });

  // printWindow.webContents.printToPDF(options).then((data) => {
  //   fs.writeFile(pdfPath, data, (error) => {
  //     if (error) {
  //       console.error(`Failed to write PDF to ${pdfPath}: `, error);
  //     } else {
  //       console.log(`Wrote PDF successfully to ${pdfPath}`);
  //     }
  //   });
  // });
}

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window when the dock icon is clicked and no other windows are open.
  if (!mainWindow) {
    createWindow();
  }
});

// Create the main window when Electron has finished initialization
app.on('ready', () => {
  ipcMain.on('print-as-pdf', handlePrintAsPDF);
  createWindow();
});
