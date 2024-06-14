import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Undo } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';

export default function UndoButton() {
  const { editor } = useCurrentEditor();

  const handleUndo = () => {
    editor?.chain().focus().undo().run();
  };

  return (
    <Button
      onClick={handleUndo}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <Undo className={toolbarStyles.icon} />
    </Button>
  );
}
