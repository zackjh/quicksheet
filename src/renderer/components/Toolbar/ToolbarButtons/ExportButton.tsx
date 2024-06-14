import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { FolderOutput } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';

export default function ExportButton() {
  const { editor } = useCurrentEditor();

  const handleExportJSON = () => {
    if (editor) {
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
  };

  return (
    <Button
      onClick={handleExportJSON}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <FolderOutput className={toolbarStyles.icon} />
    </Button>
  );
}
