import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainEvent,
  Menu,
  MenuItem,
} from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';

// Declare webpack constants for entry points
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 800,
    icon: './build/icons/png/icon.png',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    minWidth: 600,
    minHeight: 600,
  });

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools if needed.
  //mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);

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

function handlePrintAsPDF(
  event: IpcMainEvent,
  htmlContent: string,
  margins: Margins
) {
  // Open save dialog to get the PDF path
  const pdfPath = dialog.showSaveDialogSync({
    title: 'Save PDF',
    defaultPath: path.join(os.homedir(), 'Desktop', 'quicksheet.pdf'),
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
  });

  if (!pdfPath) {
    // User canceled the save dialog
    return;
  }

  // Create a new window just for printing purposes
  const printWindow = new BrowserWindow({
    show: false,
    width: 794,
    height: 1123,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  // Add CSS styles to HTML content
  const editorStyles = fs.readFileSync(
    path.resolve(__dirname, '../../../public/editor.css')
  );

  const tailwindStyles = fs.readFileSync(
    path.resolve(__dirname, '../../../public/tailwind.css')
  );

  const tiptapStyles = fs.readFileSync(
    path.resolve(__dirname, '../../../public/tiptap.css')
  );

  const styledHTMLContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${editorStyles}
        </style>
        <style>
          ${tailwindStyles}
        </style>
        <style>
          ${tiptapStyles}
        </style>
        <link href="https://cdn.jsdelivr.net/npm/@fontsource-variable/eb-garamond/index.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fontsource-variable/inter/index.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fontsource-variable/roboto-mono/index.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fontsource/fira-mono/index.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fontsource/merriweather/index.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fontsource/roboto/index.css" rel="stylesheet">
      </head>
      <body class="tiptap ProseMirror prose">
        ${htmlContent}
      </body>
    </html>
  `;

  // Load HTML content with CSS styles into printWindow
  printWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(styledHTMLContent)}`
  );

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents
      .printToPDF({
        pageSize: 'A4',
        margins: {
          top: margins.top * 0.393701,
          bottom: margins.bottom * 0.393701,
          left: margins.left * 0.393701,
          right: margins.right * 0.393701,
        },
        printBackground: true,
      })
      .then((data) => {
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error;
          console.log(`Wrote PDF successfully to ${pdfPath}`);
        });
      })
      .catch((error) => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error);
      })
      .finally(() => {
        printWindow.close();
      });
  });
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

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
