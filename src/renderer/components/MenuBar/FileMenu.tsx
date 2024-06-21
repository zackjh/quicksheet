import { useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import printAsPDF from '@/lib/printAsPDF';
import importFile from '@/lib/importFile';
import exportAsJSON from '@/lib/exportAsJSON';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';
import { menubarStyles } from '@/src/renderer/components/MenuBar/MenuBar';

export default function FileMenu() {
  const { editor } = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editor) {
      importFile(editor, event);
    }
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className={menubarStyles.menubarTrigger}>
        File
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>New</MenubarItem>

        <MenubarItem onClick={() => fileInputRef.current?.click()}>
          Import
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem
          onClick={() => {
            if (editor) {
              exportAsJSON(editor);
            }
          }}
        >
          Export
        </MenubarItem>

        <MenubarItem
          onClick={() => {
            if (editor) {
              printAsPDF(editor);
            }
          }}
        >
          Print
        </MenubarItem>
      </MenubarContent>

      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='.json'
        onChange={(event) => handleFileUpload(event)}
      />
    </MenubarMenu>
  );
}
