import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { AlignJustify } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function AlignJustifyButton() {
  const { editor } = useCurrentEditor();

  const handleAlignJustify = () => {
    editor?.chain().focus().setTextAlign('justify').run();
  };

  // Check if align justify is turned on
  const alignJustify = editor?.isActive({ textAlign: 'justify' });

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    alignJustify && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleAlignJustify}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <AlignJustify className={toolbarStyles.icon} />
    </Button>
  );
}
