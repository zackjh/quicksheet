import { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { FolderInput } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';

export default function ImportButton() {
  const { editor } = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
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
    }
    event.target.value = ''; // Clear the file input
  };

  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant='ghost'
        size='icon'
        className={toolbarStyles.iconButton}
      >
        <FolderInput className={toolbarStyles.icon} />
      </Button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='.json'
        onChange={handleFileUpload}
      />
    </>
  );
}
