import { Button } from '@/src/renderer/ui/button';
import { FilePlus } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';

export default function AddPageButton() {
  const handleAddPage = () => {
    console.log('handleAddPage was fired!');
  };
  return (
    <Button
      onClick={handleAddPage}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <FilePlus className={toolbarStyles.icon} />
    </Button>
  );
}
