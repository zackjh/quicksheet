import { createRoot } from 'react-dom/client';
import Editor from '@/src/renderer/components/Editor/Editor';
import '@fontsource/open-sans';
import '@/src/renderer/App.css';

// This component only serves as an entry point for the React application.
// Hence, this file should not be edited unless updating the build process.
// To make changes to the UI, edit the <Editor /> component and its child components instead.

const element = document.getElementById('react-app-root');

if (element) {
  const root = createRoot(element);
  root.render(<Editor />);
} else {
  console.error(
    "There is no element in index.html with id='react-app-root'. An element with this id is required as it serves as an entry point for the React application."
  );
}
