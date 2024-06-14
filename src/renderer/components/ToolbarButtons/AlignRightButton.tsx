import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { AlignRight } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';
import { clsx } from 'clsx';

export default function AlignRightButton() {
  const { editor } = useCurrentEditor();

  const handleAlignRight = () => {
    editor?.chain().focus().setTextAlign('right').run();
  };

  // Check if align right is turned on
  const alignRight = editor?.isActive({ textAlign: 'right' });

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    alignRight && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleAlignRight}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <AlignRight className={toolbarStyles.icon} />
    </Button>
  );
}
