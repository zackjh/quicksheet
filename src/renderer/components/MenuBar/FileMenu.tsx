import { useState, useEffect, useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import printAsPDF from '@/lib/printAsPDF';
import importFile from '@/lib/importFile';
import exportAsJSON from '@/lib/exportAsJSON';
import { getProseMirror } from '@/lib/utils';
import { Button } from '@/src/renderer/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/renderer/ui/dialog';
import { Input } from '@/src/renderer/ui/input';
import { Label } from '@/src/renderer/ui/label';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/src/renderer/ui/menubar';
import { RadioGroup, RadioGroupItem } from '@/src/renderer/ui/radio-group';
import { menubarStyles } from '@/src/renderer/components/MenuBar/MenuBar';
import { clsx } from 'clsx';

export default function FileMenu() {
  const { editor } = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editor) {
      importFile(editor, event);
    }
  };

  return (
    <Dialog>
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
          <MenubarSeparator />
          <DialogTrigger asChild>
            <MenubarItem>Page Setup</MenubarItem>
          </DialogTrigger>
        </MenubarContent>

        <PageSetupDialogContent />

        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept='.json'
          onChange={(event) => handleFileUpload(event)}
        />
      </MenubarMenu>
    </Dialog>
  );
}

export function PageSetupDialogContent() {
  const [pageOrientation, setPageOrientation] = useState<
    'portrait' | 'landscape'
  >('portrait');

  useEffect(() => {
    const prosemirror = getProseMirror();
    const aspectRatio = getComputedStyle(prosemirror).aspectRatio;
    if (aspectRatio === '1 / 1.414') {
      setPageOrientation('portrait');
    } else if (aspectRatio === '1.414') {
      setPageOrientation('landscape');
    }
  }, []);

  const handlePageOrientationChange = (newOrientation: string) => {
    const prosemirror = getProseMirror();
    if (newOrientation === 'portrait') {
      setPageOrientation('portrait');
      prosemirror.style.aspectRatio = '1 / 1.414';
    } else if (newOrientation === 'landscape') {
      setPageOrientation('landscape');
      prosemirror.style.aspectRatio = '1.414';
    }
  };

  const styles = {
    radioInput:
      'border-slate-500 text-neutral-700 aria-checked:border-blue-400 focus-visible:border-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0',
    numberInput:
      'font-normal h-8 w-12 p-2 rounded border-slate-500 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-0',
    margins: {
      inputDiv: 'flex items-center ml-px',
      label: 'w-14 font-normal',
    },
    button: '',
  };

  return (
    <DialogContent className='w-auto'>
      <DialogHeader>
        <DialogTitle className='text-2xl font-normal'>Page setup</DialogTitle>
      </DialogHeader>
      <div className='flex justify-between'>
        <div className='space-y-5'>
          <div>
            <Label htmlFor='page-orientation' className='font-semibold'>
              Orientation
            </Label>
            <RadioGroup
              className='ml-px mt-3 flex'
              id='page-orientation'
              value={pageOrientation}
              onValueChange={handlePageOrientationChange}
            >
              <div className='flex items-center space-x-1'>
                <RadioGroupItem
                  value='portrait'
                  id='portrait'
                  className={styles.radioInput}
                />
                <Label htmlFor='portrait' className='font-normal'>
                  Portrait
                </Label>
              </div>
              <div className='ml-4 flex items-center space-x-1'>
                <RadioGroupItem
                  value='landscape'
                  id='landscape'
                  className={styles.radioInput}
                />
                <Label htmlFor='landscape' className='font-normal'>
                  Landscape
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor='columns' className='font-semibold'>
              Columns
            </Label>
            <Input
              type='text'
              inputMode='numeric'
              className={clsx(styles.numberInput, 'ml-px mt-1')}
              id='columns'
            />
          </div>
          <div>
            <Label htmlFor='column-spacing' className='font-semibold'>
              Column Spacing
            </Label>
            <Input
              type='text'
              inputMode='numeric'
              className={clsx(styles.numberInput, 'ml-px mt-1')}
              id='column-spacing'
            />
          </div>
        </div>
        <div className='ml-14'>
          <Label htmlFor='margins' className='font-semibold'>
            Margins
          </Label>
          <div className='mt-1 space-y-5' id='margins'>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-top' className={styles.margins.label}>
                Top
              </Label>
              <Input
                type='text'
                inputMode='numeric'
                className={styles.numberInput}
                id='margin-top'
              />
            </div>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-bottom' className={styles.margins.label}>
                Bottom
              </Label>
              <Input
                type='text'
                inputMode='numeric'
                className={styles.numberInput}
                id='margin-bottom'
              />
            </div>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-left' className={styles.margins.label}>
                Left
              </Label>
              <Input
                type='text'
                inputMode='numeric'
                className={styles.numberInput}
                id='margin-left'
              />
            </div>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-right' className={styles.margins.label}>
                Right
              </Label>
              <Input
                type='text'
                inputMode='numeric'
                className={styles.numberInput}
                id='margin-right'
              />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className='mt-3 sm:justify-between'>
        <Button
          type='button'
          variant='outline'
          className='text-blue-500 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50 focus-visible:border-blue-100 focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          Set as default
        </Button>
        <div>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              className='text-blue-500 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50 focus-visible:border-blue-100 focus-visible:ring-0 focus-visible:ring-offset-0'
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type='button'
              className='ml-3 w-16 bg-blue-500 hover:bg-blue-500/90 focus-visible:bg-blue-500/70 focus-visible:ring-0 focus-visible:ring-offset-0'
            >
              OK
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
