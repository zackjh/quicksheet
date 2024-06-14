import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Italic } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function ItalicButton() {
  const { editor } = useCurrentEditor();

  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  // Check if italic is turned on
  const italic = editor?.isActive('italic');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    italic && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleItalic}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <Italic className={toolbarStyles.icon} />
    </Button>
  );
}
