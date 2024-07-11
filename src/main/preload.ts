import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  printAsPDF: (htmlContent: string) =>
    ipcRenderer.send('print-as-pdf', htmlContent),
});
