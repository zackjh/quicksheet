import { createRoot } from 'react-dom/client';
import Editor from './Editor/Editor';
import '@fontsource/open-sans';
import './App.css';

const element = document.getElementById('react-app-root');
if (element) {
  const root = createRoot(element);
  root.render(
    <div
      style={{
        fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
      }}
    >
      <Editor />
    </div>
  );
} else {
  console.error("There is no element in index.html with id='react-app-root'");
}
