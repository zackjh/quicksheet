import FileMenu from '@/src/renderer/components/MenuBar/FileMenu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';

// TODO: Remove placeholder items
export default function MenuBar() {
  return (
    <Menubar className='rounded-none border-none text-neutral-700'>
      <FileMenu />
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>PLACEHOLDER</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>PLACEHOLDER</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Insert</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>PLACEHOLDER</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>PLACEHOLDER</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
