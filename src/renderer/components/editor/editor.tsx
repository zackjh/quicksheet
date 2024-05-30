import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import EditorJSONPreview from './jsonPreview'
import MyEditorToolbar from './editorToolbar'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import CharacterCount from '@tiptap/extension-character-count'
import WordCounter  from './wordCounter'

// define your extension array
const extensions = [
  StarterKit,
  Underline,
  Color,
  TextStyle,
  CharacterCount

]
//<BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
// <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>

const content = '<p>Begin typing...</p>'

const Tiptap = () => {
  return (
    <div >
    <EditorProvider extensions={extensions} content={content} slotBefore={<MyEditorToolbar/>} slotAfter={<EditorJSONPreview/>}>

      <WordCounter />
    </EditorProvider>
    </div>
  )
}

export default Tiptap
