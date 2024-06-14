import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { ListOrdered } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';

export default function OrderedListButton() {
  const { editor } = useCurrentEditor();

  const handleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  // Check if unordered list is turned on
  const orderedList = editor?.isActive('orderedList');

  // Conditionally determine styles of button
  const styles = clsx(
    toolbarStyles.iconButton,
    orderedList && toolbarStyles.iconButtonActive
  );

  return (
    <Button
      onClick={handleOrderedList}
      variant='ghost'
      size='icon'
      className={styles}
    >
      <ListOrdered className={toolbarStyles.icon} />
    </Button>
  );
}
