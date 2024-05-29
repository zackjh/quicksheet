import { useCurrentEditor } from '@tiptap/react'

const EditorJSONPreview: React.FC = () => {
  const { editor } = useCurrentEditor()

  return (
    <pre>
      {editor && JSON.stringify(editor.getJSON(), null, 2)}
    </pre>
  )
}

export default EditorJSONPreview;
