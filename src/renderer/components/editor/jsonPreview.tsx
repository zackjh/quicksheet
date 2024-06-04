import React from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const EditorJSONPreview: React.FC = () => {
  const jsonStyle = {
    border: '2px solid black',
    padding: '2px',
    width: '100%',
    backgroundColor: '#f4f4f4'
  };

  const { editor } = useCurrentEditor();

  const exportJSON = () => {
    if (!editor) {
      return;
    }
    
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
  };

  return (
    <>
      <p>
        JSON to export:
        <button onClick={exportJSON}>
          <FontAwesomeIcon icon={faFileExport} />
        </button>
      </p>
      <pre style={jsonStyle}>
        {editor && JSON.stringify(editor.getJSON(), null, 2)}
      </pre>
    </>
  );
};

export default EditorJSONPreview;
