import { Editor } from '@tiptap/core';

export default function printAsPDF(editor: Editor) {
  // Get the HTML contents of the editor
  const editorContent = editor.getHTML();

  // Wrap the editor content into valid HTML
  const htmlContent = `
  <html>
    <head>
      <style>background-color:red;</style>
    </head>
    <body>
      ${editorContent}
    </body>
  </html>
  `;
  window.electronAPI.printAsPDF(htmlContent);
}
