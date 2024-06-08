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
import CodeBlockLowlight, { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight';

import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'

import {common, createLowlight} from 'lowlight'

import './Editor.css';




// Define extension array


const editorFooter = (
  <>
    <WordCounter />
    {/* <JSONPreview /> */}
  </>
);

export default function Editor() {
  const lowlight = createLowlight(common)

  lowlight.register('css', css);
  lowlight.register('javascript', js);
  lowlight.register('typescript', ts);
  lowlight.register('html', html);
  lowlight.register('python', python);
  lowlight.register('c', c);
  lowlight.register('cpp', cpp);

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
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'javascript',
    }),

  ];

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
