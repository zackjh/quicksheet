export {};

declare global {
  interface Window {
    electronAPI: {
      printAsPDF: (htmlContent: string) => Promise<Buffer>;
    };
  }
}
