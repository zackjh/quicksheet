import EditorToolbar from '../EditorToolbar/EditorToolbar';
// TODO: Remove import if not needed
// import JSONPreview from '../JSONPreview';
import WordCounter from '../WordCounter/WordCounter';

import { EditorProvider } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlock } from '@tiptap/extension-code-block';
// TODO: Remove import if not needed
// import Focus from '@tiptap/extension-focus';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';

import './Editor.css';

// Define extension array
const extensions = [
  StarterKit,
  Highlight,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
  Color,
  TextStyle,
  CharacterCount,
  Typography,
  CodeBlock,
  // Focus.configure({
  //   className: 'has-focus', // TODO: Remove Focus extension if not needed
  //   mode: 'deepest',
  // }),
];

// <BubbleMenu editor={null}>This is the bubble? menu</BubbleMenu>
// <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>

const editorFooter = (
  <>
    <WordCounter />
    {/* <JSONPreview /> */}
  </>
);

export default function Editor() {
  return (
    <div className='editor'>
      <EditorProvider
        extensions={extensions}
        slotBefore={<EditorToolbar />}
        slotAfter={editorFooter}
      ></EditorProvider>
    </div>
  );
}
