import { createRoot } from 'react-dom/client';
import React from 'react';
import Tiptap from './renderer/components/editor/editor';

const element = document.getElementById('react-app-root');
if (element) {
  const root = createRoot(element);
  root.render(
    <>
      <Tiptap />
    </>
  );
} else {
  console.error("There is no element in index.html with id='react-app-root'");
}
