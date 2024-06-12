import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import React from 'react';

export default function PrintPDFButton() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const printPDF = () => {
    const opt = {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      onBeforeSave: () => {
        // Workaround to preserve background colors
        document.querySelectorAll('*').forEach((el) => {
          const bgColor = window
            .getComputedStyle(el)
            .getPropertyValue('background-color');
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
            (el as HTMLElement).style.backgroundColor = bgColor;
          }
        });
      },
    };

    const content = editor.getHTML();
    const styledContent = `
      <html>
        <head>
          <style>
            /* Your CSS styles */
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              margin: auto;
              max-width: 38rem;
              padding: 2rem;
            }

            .tiptap > * + * {
              margin-top: 0.75em;
            }

            .tiptap pre {
              background: #0d0d0d;
              border-radius: 0.5rem;
              color: #fff;
              font-family: "JetBrainsMono", monospace;
              padding: 0.75rem 1rem;
            }

            .tiptap pre code {
              background: none;
              color: inherit;
              font-size: 0.8rem;
              padding: 0;
            }

            .has-focus {
              border-radius: 1px;
              box-shadow: 0 0 0 1px #68cef8;
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `;

    const worker = html2pdf().from(styledContent).set(opt).save();
  };

  return (
    <button id='PrintPDF' onClick={printPDF}>
      Print PDF <FontAwesomeIcon icon={faPrint} />
    </button>
  );
}
