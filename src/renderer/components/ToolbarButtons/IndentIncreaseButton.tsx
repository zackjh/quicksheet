import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { IndentIncrease } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';

export default function IndentIncreaseButton() {
  const { editor } = useCurrentEditor();

  const handleIndentIncrease = () => {
    editor?.chain().focus().sinkListItem('listItem').run();
  };

  return (
    <Button
      onClick={handleIndentIncrease}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <IndentIncrease className={toolbarStyles.icon} />
    </Button>
  );
}
