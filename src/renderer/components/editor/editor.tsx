import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorJSONPreview from './jsonPreview'
import MyEditorToolbar from './editorToolbar'

// define your extension array
const extensions = [
  StarterKit,
]

const content = '<p>Hello World!</p>'

const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content} slotBefore={<MyEditorToolbar />}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
      <EditorJSONPreview />
    </EditorProvider>
  )
}

export default Tiptap
