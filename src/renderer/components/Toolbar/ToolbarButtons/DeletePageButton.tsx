import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { FileMinus } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';

export default function DeletePageButton() {
  const { editor } = useCurrentEditor();

  const handleDeletePage = () => {
    console.log('handleDeletePage was fired!');
  };
  return (
    <Button
      onClick={handleDeletePage}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <FileMinus className={toolbarStyles.icon} />
    </Button>
  );
}
