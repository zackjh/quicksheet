import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorJSONPreview from './jsonPreview'
import MyEditorToolbar from './editorToolbar'
import Underline from '@tiptap/extension-underline'

// define your extension array
const extensions = [
  StarterKit,
  Underline
]
//<BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
// <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>

const content = '<p>Begin typing...</p>'

const Tiptap = () => {
  return (
    <div >
    <EditorProvider extensions={extensions} content={content} slotBefore={<MyEditorToolbar/>} slotAfter={<EditorJSONPreview/>}>


    </EditorProvider>
    </div>
  )
}

export default Tiptap
