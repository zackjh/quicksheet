import { Editor } from '@tiptap/core';

export default function printAsPDF(editor: Editor) {
  // const content = editor.getHTML();
  window.electronAPI.printAsPDF();
}
