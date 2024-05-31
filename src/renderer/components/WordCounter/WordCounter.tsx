import { useCurrentEditor } from '@tiptap/react';

import './WordCounter.css';

export default function WordCounter() {
  const { editor } = useCurrentEditor();
  const charCount = editor?.storage.characterCount.characters();
  const wordCount = editor?.storage.characterCount.words();

  return (
    <p className='wordCounter'>
      Character Count: {charCount} Word Count: {wordCount}
    </p>
  );
}
