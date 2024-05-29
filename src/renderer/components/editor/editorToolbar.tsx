import { useCurrentEditor } from '@tiptap/react'

export default function MyEditorToolbar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        toggleItalic
      </button>
      <button>underline</button>
    </div>
  )
}
