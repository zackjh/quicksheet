import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Code } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';
import { clsx } from 'clsx';

export default function CodeBlockButton() {
  const { editor } = useCurrentEditor();

  const handleCodeBlock = () => {
    editor?.chain().focus().toggleCodeBlock().run();
  };

  // Check if code block is turned on
  const codeBlock = editor?.isActive('codeBlock');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    codeBlock && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleCodeBlock}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <Code className={toolbarStyles.icon} />
    </Button>
  );
}
