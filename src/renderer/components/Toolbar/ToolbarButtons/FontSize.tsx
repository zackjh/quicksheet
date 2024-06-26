import { useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import { Input } from '@/src/renderer/ui/input';
import { Plus, Minus } from 'lucide-react';

export default function FontSize() {
  const { editor } = useCurrentEditor();
  const [fontSize, setFontSize] = useState(11);

  const handleFontSizeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    // Function to check if the value is an integer
    const isInteger = (value: string): boolean => {
      const number = parseFloat(value);
      return Number.isInteger(number);
    };

    if (isInteger(value)) {
      setFontSize(parseInt(value, 10));
    }
  };

  const handleFontSizeDecrease = () => {
    let newFontSize;
    if (fontSize <= 10) {
      newFontSize = fontSize - 0.5;
    } else {
      newFontSize = fontSize - 1;
    }

    setFontSize(newFontSize);
    editor?.chain().focus().setFontSize(`${newFontSize}pt`).run();
  };

  const handleFontSizeIncrease = () => {
    let newFontSize;

    if (fontSize < 10) {
      newFontSize = fontSize + 0.5;
    } else {
      newFontSize = fontSize + 1;
    }
    setFontSize(newFontSize);
    editor?.chain().focus().setFontSize(`${newFontSize}pt`).run();
  };

  const styles = {
    input:
      'mx-[2px] h-7 w-10 border-slate-500 bg-slate-200 p-0 text-center focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-0',
    button:
      'm-px h-6 w-6 rounded bg-slate-200 text-neutral-700 ring-inset hover:bg-slate-300 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0 active:bg-slate-400',
    icon: 'h-3 w-3',
  };

  return (
    <div className='flex items-center'>
      <Button
        onClick={handleFontSizeDecrease}
        variant='ghost'
        size='icon'
        className={styles.button}
      >
        <Minus className={styles.icon} />
      </Button>
      <Input
        type='text'
        inputMode='numeric'
        value={fontSize}
        onChange={handleFontSizeChange}
        className={styles.input}
      />
      <Button
        onClick={handleFontSizeIncrease}
        variant='ghost'
        size='icon'
        className={styles.button}
      >
        <Plus className={styles.icon} />
      </Button>
    </div>
  );
}
