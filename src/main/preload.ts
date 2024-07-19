import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  printAsPDF: (htmlContent: string, margins: object) =>
    ipcRenderer.send('print-as-pdf', htmlContent, margins),
});
