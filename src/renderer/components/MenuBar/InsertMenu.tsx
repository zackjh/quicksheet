import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';
import { menubarStyles } from '@/src/renderer/components/MenuBar/MenuBar';

export default function InsertMenu() {
  const handleInsertPage = () => {
    console.log('handleInsertPage was fired!');
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className={menubarStyles.menubarTrigger}>
        Insert
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={handleInsertPage}>New page</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}
