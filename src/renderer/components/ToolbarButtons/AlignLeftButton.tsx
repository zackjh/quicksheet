import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { AlignLeft } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';
import { clsx } from 'clsx';

export default function AlignLeftButton() {
  const { editor } = useCurrentEditor();

  const handleAlignLeft = () => {
    editor?.chain().focus().setTextAlign('left').run();
  };

  // Check if align left is turned on
  const alignLeft = editor?.isActive({ textAlign: 'left' });

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    alignLeft && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleAlignLeft}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <AlignLeft className={toolbarStyles.icon} />
    </Button>
  );
}
