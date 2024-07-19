export {};

declare global {
  interface Window {
    electronAPI: {
      printAsPDF: (htmlContent: string, margins: object) => Promise<string>;
    };
  }
}
