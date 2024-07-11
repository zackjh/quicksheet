import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { AlignCenter, Save } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';
import { clsx } from 'clsx';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';

export default function AlignCenterButton() {
  const { editor } = useCurrentEditor();
  const content = editor?.getHTML() ?? '';
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

  useEffect(() => {
    const SaveLocalInfo: () => void = () => {
      window.localStorage.setItem('content', content);
      // console.log('Saved to local storage');
      // console.log(content);
    };

    if (debouncedEditor) {
      SaveLocalInfo();
    }
  }, [debouncedEditor, content]);

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
