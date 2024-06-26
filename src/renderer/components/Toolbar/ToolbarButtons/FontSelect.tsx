import { useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { stripTrailingVariable } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/renderer/ui/select';
import { fontFamilies } from '@/lib/fonts';

export default function FontSelect() {
  const { editor } = useCurrentEditor();
  const [currentFont, setCurrentFont] = useState('Inter Variable');

  const handleFontChange = (newFont: string) => {
    setCurrentFont(newFont);
    // TODO: The .focus() here doesn't work for some reason
    // I think it has something to do with the default focus behavior of the shadcn <Select> component
    editor?.chain().focus().setFontFamily(newFont).run();
  };

  const selectItems = fontFamilies.sort().map((fontFamily) => (
    <SelectItem
      value={fontFamily}
      key={fontFamily}
      style={{ fontFamily: fontFamily }}
    >
      {stripTrailingVariable(fontFamily)}
    </SelectItem>
  ));

  return (
    <>
      <Select onValueChange={handleFontChange} defaultValue='Inter Variable'>
        <SelectTrigger
          className='m-px h-9 w-40 border-none bg-slate-200 ring-inset focus:ring-1 focus:ring-slate-700 focus:ring-offset-0'
          style={{ fontFamily: currentFont }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{selectItems}</SelectContent>
      </Select>
    </>
  );
}
