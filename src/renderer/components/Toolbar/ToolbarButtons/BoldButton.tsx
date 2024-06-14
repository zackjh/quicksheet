import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Bold } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function BoldButton() {
  const { editor } = useCurrentEditor();

  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  // Check if bold is turned on
  const bold = editor?.isActive('bold');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    bold && toolbarStyles.iconButtonActive
  );

  return (
    <Button onClick={handleBold} variant='ghost' size='icon' className={styles}>
      <Bold className={toolbarStyles.icon} />
    </Button>
  );
}
