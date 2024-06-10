import { useRef } from 'react';

import PrintPDF from '../PrintPDFButton';

import { Editor, useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
  faFileImport,
  faPalette,
  faHighlighter,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faUndo,
  faRedo,
  faCode,
  faFileExport,
  faList,
  faListOl,
  faIndent,
  faOutdent,
} from '@fortawesome/free-solid-svg-icons';

import './EditorToolbar.css';

export default function EditorToolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className='editorToolbar'>
      <ImportFileButton editor={editor} />
      <PrintPDF />
      <ExportJSONButton editor={editor} />
      <UndoButton editor={editor} />
      <RedoButton editor={editor} />
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <UnderlineButton editor={editor} />
      <ChangeColorButton editor={editor} />
      <HighlightButton editor={editor} />
      <CodeBlockButton editor={editor} />
      <LeftAdjustButton editor={editor} />
      <CenterAdjustButton editor={editor} />
      <RightAdjustButton editor={editor} />
      <JustifyAdjustButton editor={editor} />
      <BulletListButton editor={editor}/>
      <OrderedListButton editor={editor}/>
      <ListShiftRightButton editor={editor}/>
      <ListShiftLeftButton editor={editor}/>
      <InsertTableButton editor={editor} />
      <InsertRowButton editor={editor} />
      <InsertColumnButton editor={editor} />
      <DeleteRowButton editor={editor} />
      <DeleteColumnButton editor={editor} />
      <ToggleMergeCellButton editor={editor} />
    </div>
  );
}

function UndoButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().undo()}
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  );
}

function RedoButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().redo()}
    >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
}

function ItalicButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={editor.isActive('italic') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faItalic} />
    </button>
  );
}

function BoldButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={editor.isActive('bold') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faBold} />
    </button>
  );
}

function UnderlineButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
      className={editor.isActive('underline') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faUnderline} />
    </button>
  );
}

function ChangeColorButton({ editor }: { editor: Editor }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  return (
    <>
      <button onClick={() => inputRef.current?.click()}>
        <FontAwesomeIcon icon={faPalette} />
      </button>
      <input
        style={{ display: 'none', position: 'absolute', top: '0', right: '0' }}
        type='color'
        ref={inputRef}
        onChange={handleColorChange}
        value={editor.getAttributes('textStyle').color}
        data-testid='setColor'
      />
    </>
  );
}

function HighlightButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      className={editor.isActive('highlight') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faHighlighter} />
    </button>
  );
}

function CodeBlockButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={editor.isActive('codeBlock') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faCode} />
    </button>
  );
}

function LeftAdjustButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('left').run()}
      className={editor.isActive('left') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignLeft} />
    </button>
  );
}

function CenterAdjustButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('center').run()}
      className={editor.isActive('center') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignCenter} />
    </button>
  );
}

function RightAdjustButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('right').run()}
      className={editor.isActive('right') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignRight} />
    </button>
  );
}

function JustifyAdjustButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      className={editor.isActive('justify') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignJustify} />
    </button>
  );
}

function ImportFileButton({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const jsonContent = JSON.parse(e.target?.result as string);
          editor.commands.clearContent(); // Clear existing content
          editor.commands.setContent(jsonContent); // Set new content
          console.log('Imported JSON:', jsonContent);
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
      };
      reader.readAsText(file);
    }
    event.target.value = ''; // Clear the file input
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faFileImport} /> Import File
      </button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='.json'
        onChange={handleFileChange}
      />
    </>
  );
}

function ExportJSONButton({ editor }: { editor: Editor }) {
  function handleExportJSON() {
    const json = editor.getJSON();
    const jsonString = JSON.stringify(json, null, 2);

    // Create a blob with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'editor-content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button onClick={handleExportJSON}>
      <FontAwesomeIcon icon={faFileExport} /> Export File
    </button>
  );
}

function BulletListButton ({  editor }: { editor: Editor}){
  return (
    <button
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    className={editor.isActive('bulletList') ? 'is-active' : ''}
  >
    <FontAwesomeIcon icon={faList}/>
  </button>
  )
}

function OrderedListButton ({editor}: {editor: Editor}){
  return (
    <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faListOl}/>
      </button>
  )
}

function ListShiftRightButton ({editor}: {editor: Editor}){
  return (
    <button
        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
        disabled={!editor.can().sinkListItem('listItem')}
      >
        <FontAwesomeIcon icon={faIndent} />
      </button>
  )
}

function ListShiftLeftButton ({editor}: {editor: Editor}){
  return (
    <button
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        disabled={!editor.can().liftListItem('listItem')}
      >
        <FontAwesomeIcon icon={faOutdent} />
      </button>
  )
}

function InsertTableButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()}>
      Insert Table
    </button>
  );
}

function InsertRowButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().addRowAfter().run()}>
      Insert Row
    </button>
  );
}
function InsertColumnButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
      Insert Column
    </button>
  );
}

function DeleteColumnButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().deleteColumn().run()}>
      Delete Column
    </button>
  );
}

function DeleteRowButton ({editor}: {editor: Editor}){
  return (
    <button onClick={() => editor.chain().focus().deleteRow().run()}>
      Delete Row
    </button>
  )
}

function ToggleMergeCellButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().mergeOrSplit().run()} disabled={!editor.can().mergeOrSplit()}>
        mergeOrSplit
    </button>
  );
}
