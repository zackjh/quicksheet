import { useCurrentEditor } from '@tiptap/react';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';
import { menubarStyles } from '@/src/renderer/components/MenuBar/MenuBar';

export default function InsertMenu() {
  const { editor } = useCurrentEditor();

  return (
    <MenubarMenu>
      <MenubarTrigger className={menubarStyles.menubarTrigger}>
        Insert
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Page break</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
