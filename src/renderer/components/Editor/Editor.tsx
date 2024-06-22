// Our own components
import MenuBar from '@/src/renderer/components/MenuBar/MenuBar';
import Toolbar from '@/src/renderer/components/Toolbar/Toolbar';
import WordCounter from '@/src/renderer/components/WordCounter';

// Tiptap components
import { EditorProvider, ReactNodeViewRenderer } from '@tiptap/react';
import { Code } from '@tiptap/extension-code';
import { CodeBlock } from '@tiptap/extension-code-block';
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
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import { defaultShouldRender } from '@tiptap-pro/extension-mathematics';

// Modules for code block syntax highlighting
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import { lowlight } from "lowlight/lib/common.js";

import 'katex/dist/katex.min.css';
import CodeBlockComponent from '@/src/renderer/components/Toolbar/ToolbarButtons/CodeBlockComponent';

// TODO: Inside Editor.css: Remove styles for editor and replace with inline tailwind classes
// The above message was written because ESLint won't lint CSS files
// Stylesheets
import '@/src/renderer/components/Editor/Editor.css';

const editorHeader = (
  <>
    <MenuBar />
    <Toolbar />
  </>
);

// TODO: Decide what to do with the editorFooter
const editorFooter = (
  <>
    <WordCounter />
    {/* <JSONPreview /> */}
  </>
);




export default function Editor() {
  // Set up code block syntax highlighting

  // Tiptap extensions
  const extensions = [

    Mathematics.configure({
        shouldRender: (state, pos, node) => {
          const $pos = state.doc.resolve(pos)
          return node.type.name === 'text' && $pos.parent.type.name !== 'codeBlock'
        }

    }),


    StarterKit.configure({
      // Disable an included extension
      codeBlock: false,
    }),
    Highlight,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline,
    Color,
    TextStyle,
    CharacterCount,
    Typography,
    CodeBlockLowlight
    .extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent)
      },
      }).configure({
      lowlight,
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
      slotBefore={editorHeader}
      slotAfter={editorFooter}
      editorProps={editorProps}
    ></EditorProvider>
  );
}
