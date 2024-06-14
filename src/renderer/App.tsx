import { createRoot } from 'react-dom/client';
import Editor from '@/src/renderer/components/Editor/Editor';
import '@fontsource/open-sans';
import '@/src/renderer/App.css';

const element = document.getElementById('react-app-root');

if (element) {
  const root = createRoot(element);
  root.render(
    <div
      style={{
        fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
      }}
      className='bg-slate-50'
    >
      <Editor />
    </div>
  );
} else {
  console.error(
    "There is no element in index.html with id='react-app-root'. An element with this id is required as it serves as an entry point for the React application."
  );
}
