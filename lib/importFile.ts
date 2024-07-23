import { Editor } from '@tiptap/core';

export default function importFile(
  editor: Editor,
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];
  if (file) {
    // Check if the file extension is .qs
    if (file.name.endsWith('.qs')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const jsonContent = JSON.parse(e.target?.result as string);
          editor.commands.clearContent(); // Clear existing content
          editor.commands.setContent(jsonContent); // Set new content
          console.log('Imported JSON:', jsonContent);
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('File is not a .qs file');
    }
  }
  event.target.value = ''; // Clear the file input
}
