import { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Palette } from 'lucide-react';
import { toolbarStyles } from '@/src/renderer/components/Toolbar/Toolbar';

export default function ChangeTextColorButton() {
  const { editor } = useCurrentEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Undo operation is run only if editor is not null
  const handleChangeTextColor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    editor?.chain().focus().setColor(event.target.value).run();
  };

  // TODO: Style input element - shadcn has no color picker component so an alternative is needed
  return (
    <Button
      onClick={() => inputRef.current?.click()}
      variant='ghost'
      size='icon'
      className={toolbarStyles.iconButton}
    >
      <Palette className={toolbarStyles.icon} />
      <input
        style={{ display: 'none', position: 'absolute', top: '0', right: '0' }}
        type='color'
        ref={inputRef}
        onChange={handleChangeTextColor}
        value={editor?.getAttributes('textStyle').color}
        data-testid='setColor'
      />
    </Button>
  );
}
