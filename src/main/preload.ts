import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  printAsPDF: () => ipcRenderer.send('print-as-pdf'),
});
