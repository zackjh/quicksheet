import React, { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faFileImport , faPalette, faHighlighter, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faUndo, faRedo, faCode} from '@fortawesome/free-solid-svg-icons';
import  PrintPDF  from './printPDF';

export default function MyEditorToolbar() {
  const { editor } = useCurrentEditor();
  const style = {
    border: '2px solid black',
    padding: '2px',
    display: 'flex',
    justifyContent: 'space-between'
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={style}>
      <div>
        <UndoButton editor={editor}/>
        <RedoButton editor={editor}/>
      </div>

      <div>
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <UnderlineButton editor={editor} />
      <ChangeColorButton editor={editor} />
      <HighlightButton editor={editor} />
      <CodeBlockButton editor={editor} />
      </div>
      <div>
      <LeftAdjustButton editor={editor} />
      <CenterAdjustButton editor={editor} />
      <RightAdjustButton editor={editor} />
      <JustifyAdjustButton editor={editor} />
      </div>

      <ImportFileButton editor={editor} />
      <PrintPDF/>
    </div>
  );
}
// Undo and Redo buttons
function UndoButton({ editor }: { editor: any }) {
  return (
    <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  );
}

function RedoButton({ editor }: { editor: any }) {
  return (
    <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
}

// Text style buttons

function ItalicButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={editor.isActive('italic') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faItalic} />
    </button>
  );
}

function BoldButton({ editor }: { editor: any }) {
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

function UnderlineButton({ editor }: { editor: any }) {
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

function ChangeColorButton({ editor }: { editor: any }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  return (
    <>
      <button onClick={() => inputRef.current?.click()} >
        <FontAwesomeIcon icon={faPalette} />
      </button>
      <input
        style={{display: 'none' , position: 'absolute', top: '0', right: '0' }}
        type="color"
        ref={inputRef}
        onChange={handleColorChange}
        value={editor.getAttributes('textStyle').color}
        data-testid="setColor"

      />
    </>
  );
}

function HighlightButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
      <FontAwesomeIcon icon={faHighlighter} />
    </button>
  );
}
function CodeBlockButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={editor.isActive('codeBlock') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faCode} />
    </button>
  );
}

//Align buttons

function LeftAdjustButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('left').run()}
      className={editor.isActive('left') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignLeft} />
    </button>
  );
}

function CenterAdjustButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('center').run()}
      className={editor.isActive('center') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignCenter} />
    </button>
  );
}

function RightAdjustButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('right').run()}
      className={editor.isActive('right') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignRight} />
    </button>
  );
}

function JustifyAdjustButton({ editor }: { editor: any }) {
  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      className={editor.isActive('justify') ? 'is-active' : ''}
    >
      <FontAwesomeIcon icon={faAlignJustify} />
    </button>
  );
}




function ImportFileButton({ editor }: { editor: any }) {
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
      <button  onClick={handleClick}>
        <FontAwesomeIcon icon={faFileImport} /> Import File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".json"
        onChange={handleFileChange}
      />
    </>
  );
}
