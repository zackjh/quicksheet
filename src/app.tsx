import { createRoot } from 'react-dom/client';

const element = document.getElementById('react-app-root');
if (element) {
  const root = createRoot(element);
  root.render(<h2>Hello from React!</h2>);
} else {
  console.error("There is no element in index.html with id='react-app-root'");
}
