// Our own components
import MenuBar from '@/src/renderer/components/MenuBar/MenuBar';
import Toolbar from '@/src/renderer/components/Toolbar/Toolbar';
import WordCounter from '@/src/renderer/components/WordCounter';
import CodeBlockNode from '@/src/renderer/components/CodeBlockNode';

// Tiptap components
import { EditorProvider, ReactNodeViewRenderer } from '@tiptap/react';
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
import { FontFamily } from '@tiptap/extension-font-family';
import { LiteralTab } from '@/lib/LiteralTab';
import { FontSize } from 'tiptap-extension-font-size';

// Modules for code block syntax highlighting
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import { lowlight } from 'lowlight';
import { FileHandler } from '@tiptap-pro/extension-file-handler';
import { Image } from '@tiptap/extension-image';

import 'katex/dist/katex.min.css';
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

// Tiptap extensions
// IMPORTANT: LiteralTab must be placed before StaterKit or ListItem extension(s) in order to retain
// the default 'indent using Tab' keyboard shortcut for lists
const extensions = [
  LiteralTab,
  Mathematics.configure({
    shouldRender: (state, pos, node) => {
      const $pos = state.doc.resolve(pos);
      return node.type.name === 'text' && $pos.parent.type.name !== 'codeBlock';
    },
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
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockNode);
    },
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          if (this.editor.isActive('codeBlock')) {
            this.editor.commands.insertContent('\t');
            return true; // Indicate the command was handled
          }
          return false; // Indicate the command was not handled
        },
      };
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
  Image.configure({
    allowBase64: true,
  }),
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach((file) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(pos, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach((file) => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          console.log(htmlContent); // eslint-disable-line no-console
          return false;
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
  }),
  FontFamily,
  FontSize,
];

// Set base classes for editor styling because tailwind removes them by default
const editorProps = {
  attributes: {
    class:
      'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
  },
};

// Set up code block syntax highlighting
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('c', c);
lowlight.registerLanguage('cpp', cpp);

export default function Editor() {
  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={editorHeader}
      slotAfter={editorFooter}
      editorProps={editorProps}
    ></EditorProvider>
  );
}
