import FileMenu from '@/src/renderer/components/MenuBar/FileMenu';
import InsertMenu from '@/src/renderer/components/MenuBar/InsertMenu';
import HelpMenu from '@/src/renderer/components/MenuBar/HelpMenu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';

export const menubarStyles = {
  menubarTrigger:
    'm-0 h-6 rounded-none hover:cursor-pointer hover:bg-neutral-200 data-[state=open]:bg-neutral-300',
};

export default function MenuBar() {
  return (
    <Menubar className='mb-2 h-6 space-x-0 rounded-none border-none bg-neutral-50 p-0 text-neutral-700'>
      <FileMenu />

      <MenubarMenu>
        <MenubarTrigger className={menubarStyles.menubarTrigger}>
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Placeholder</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <InsertMenu />
      <HelpMenu />
    </Menubar>
  );
}
