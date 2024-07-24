import React, { useState } from 'react'; // Step 4: Import useState from React
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';
import { menubarStyles } from '@/src/renderer/components/MenuBar/MenuBar';
import { Button } from '@/src/renderer/ui/button';
import { Label } from '@/src/renderer/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/renderer/ui/dialog';

export default function HelpMenu() {
  return (
    <Dialog>
      <MenubarMenu>
        <MenubarTrigger className={menubarStyles.menubarTrigger}>
          Help
        </MenubarTrigger>
        <MenubarContent>
          <DialogTrigger asChild>
            <MenubarItem>Documentation</MenubarItem>
          </DialogTrigger>
        </MenubarContent>
        <HelpModalContent />
      </MenubarMenu>
    </Dialog>
  );
}

export function HelpModalContent() {
  return (
    <DialogContent className='w-auto'>
      <DialogHeader>
        <DialogTitle className='text-2xl font-normal'>
          Documentation
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between'>
        <div className='space-y-5'>
          <div>
            <Label htmlFor='page-orientation' className='font-semibold'>
              Commands
            </Label>
          </div>
          <p>
            <strong>Ctrl + X/C </strong> - Cut/ Copy
          </p>
          <p>
            <strong>Ctrl + B/I/U </strong> - Bold/ Italicise/ Underline
          </p>
          <p>
            <strong>Ctrl + Z</strong> - Undo
          </p>
          <p>
            <strong>Ctrl + Y</strong> - Redo
          </p>
          <p>
            <strong>$ Y = mX + C $</strong> - Insert LaTeX
          </p>
          <p>
            <strong>```javascript </strong> - Insert code block with javascript
            syntax
          </p>
          <p>
            <strong>Tab / Tab Shift</strong> - Indent/ Undo indent
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
