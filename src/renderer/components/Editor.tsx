import EditorToolbar from './EditorToolbar';
import JSONPreview from './JSONPreview';
import WordCounter from './WordCounter';

import { EditorProvider } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlock } from '@tiptap/extension-code-block';
import Focus from '@tiptap/extension-focus';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';

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
  Focus.configure({
    className: 'has-focus',
    mode: 'deepest',
  }),
];

// <BubbleMenu editor={null}>This is the bubble? menu</BubbleMenu>
// <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>

const content = '<p>Begin typing...</p>';
const editorFooter = (
  <>
    <WordCounter />
    <JSONPreview />
  </>
);

export default function Editor() {
  return (
    <>
      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<EditorToolbar />}
        slotAfter={editorFooter}
      ></EditorProvider>
    </>
  );
}
