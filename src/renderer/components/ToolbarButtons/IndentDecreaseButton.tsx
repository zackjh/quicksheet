import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { IndentDecrease } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';

export default function IndentDecreaseButton() {
  const { editor } = useCurrentEditor();

  const handleIndentDecrease = () => {
    editor?.chain().focus().liftListItem('listItem').run();
  };

  return (
    <Button
      onClick={handleIndentDecrease}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <IndentDecrease className={toolbarStyles.icon} />
    </Button>
  );
}
