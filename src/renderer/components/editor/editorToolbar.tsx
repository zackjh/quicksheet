import React, { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faFileImport , faPalette} from '@fortawesome/free-solid-svg-icons';

export default function MyEditorToolbar() {
  const { editor } = useCurrentEditor();
  const style = {
    border: '2px solid black',
    padding: '2px'
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={style}>
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <UnderlineButton editor={editor} />
      <ChangeColorButton editor={editor} />
      <ImportFileButton editor={editor} />
    </div>
  );
}

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
      <button style={{ marginLeft: '10px' }} onClick={handleClick}>
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
