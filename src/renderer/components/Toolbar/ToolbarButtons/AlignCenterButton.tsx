import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { AlignCenter } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function AlignCenterButton() {
  const { editor } = useCurrentEditor();

  const handleAlignCenter = () => {
    editor?.chain().focus().setTextAlign('center').run();
  };

  // Check if align center is turned on
  const alignCenter = editor?.isActive({ textAlign: 'center' });

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    alignCenter && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleAlignCenter}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <AlignCenter className={toolbarStyles.icon} />
    </Button>
  );
}
