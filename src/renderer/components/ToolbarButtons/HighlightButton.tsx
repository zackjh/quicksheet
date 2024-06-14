import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Highlighter } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';
import { clsx } from 'clsx';

export default function HighlightButton() {
  const { editor } = useCurrentEditor();

  const handleHighlight = () => {
    editor?.chain().focus().toggleHighlight().run();
  };

  // Check if highlight is turned on
  const highlight = editor?.isActive('highlight');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    highlight && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleHighlight}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <Highlighter className={toolbarStyles.icon} />
    </Button>
  );
}
