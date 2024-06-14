import Toolbar from '../Toolbar/Toolbar';
import WordCounter from '../WordCounter';

import { EditorProvider } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';

import { common, createLowlight } from 'lowlight';

// Import stylesheets
import '@/src/renderer/components/Editor/Editor.css';

// TODO: Decide what to do with the editorFooter
const editorFooter = (
  <>
    <WordCounter />
    {/* <JSONPreview /> */}
  </>
);

export default function Editor() {
  const lowlight = createLowlight(common);

  lowlight.register('css', css);
  lowlight.register('javascript', js);
  lowlight.register('typescript', ts);
  lowlight.register('html', html);
  lowlight.register('python', python);
  lowlight.register('c', c);
  lowlight.register('cpp', cpp);

  const extensions = [
    StarterKit.configure({ codeBlock: false }),
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
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];

  // Set base classes for editor styling because tailwind removes them by default
  const editorProps = {
    attributes: {
      class:
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  };

  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={<Toolbar />}
      slotAfter={editorFooter}
      editorProps={editorProps}
    ></EditorProvider>
  );
}
