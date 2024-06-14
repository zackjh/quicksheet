import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Underline } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';
import { clsx } from 'clsx';

export default function UnderlineButton() {
  const { editor } = useCurrentEditor();

  const handleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  // Check if underline is turned on
  const underline = editor?.isActive('underline');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    underline && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleUnderline}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <Underline className={toolbarStyles.icon} />
    </Button>
  );
}
