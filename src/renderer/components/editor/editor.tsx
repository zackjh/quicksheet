import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorJSONPreview from './jsonPreview'
import MyEditorToolbar from './editorToolbar'

// define your extension array
const extensions = [
  StarterKit,
]

const content = '<p>Begin typing...</p>'

const Tiptap = () => {
  return (
    <div >
    <EditorProvider extensions={extensions} content={content} slotBefore={<MyEditorToolbar/>} slotAfter={<EditorJSONPreview/>}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
    </div>
  )
}

export default Tiptap
