import { useCurrentEditor } from '@tiptap/react';

export default function WordCounter() {
  const { editor } = useCurrentEditor();
  const charCount = editor?.storage.characterCount.characters();
  const wordCount = editor?.storage.characterCount.words();

  return (
    <p className='mx-10 my-7 text-end'>
      Character Count: {charCount} Word Count: {wordCount}
    </p>
  );
}
