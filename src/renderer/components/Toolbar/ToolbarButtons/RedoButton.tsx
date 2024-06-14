import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Redo } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';

export default function RedoButton() {
  const { editor } = useCurrentEditor();

  const handleRedo = () => {
    editor?.chain().focus().redo().run();
  };

  return (
    <Button
      onClick={handleRedo}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <Redo className={toolbarStyles.icon} />
    </Button>
  );
}
