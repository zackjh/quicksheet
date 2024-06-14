import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { List } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function UnorderedListButton() {
  const { editor } = useCurrentEditor();

  const handleUnorderedList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  // Check if unordered list is turned on
  const unorderedList = editor?.isActive('bulletList');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    unorderedList && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleUnorderedList}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <List className={toolbarStyles.icon} />
    </Button>
  );
}
