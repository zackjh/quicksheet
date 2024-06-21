import { Editor } from '@tiptap/core';

export default function exportAsJSON(editor: Editor) {
  const json = editor.getJSON();
  const jsonString = JSON.stringify(json, null, 2);

  // Create a blob with the JSON string
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create a link element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'editor-content.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
