export {};

declare global {
  interface Window {
    electronAPI: {
      printAsPDF: () => Promise<Buffer>;
    };
  }
}
