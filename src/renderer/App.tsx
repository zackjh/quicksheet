import { createRoot } from 'react-dom/client';
import Editor from './components/Editor';

const element = document.getElementById('react-app-root');
if (element) {
  const root = createRoot(element);
  root.render(
    <>
      <Editor />
    </>
  );
} else {
  console.error("There is no element in index.html with id='react-app-root'");
}
