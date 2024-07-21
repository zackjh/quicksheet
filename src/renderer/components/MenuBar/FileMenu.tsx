import { useState, useEffect, useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import importFile from '@/lib/importFile';
import exportAsJSON from '@/lib/exportAsJSON';
import { getProseMirror, pixelsToCm, isNumber } from '@/lib/utils';
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

  const handlePrintAsPDF = () => {
    const div = document.getElementsByClassName('tiptap')[0];

    const prosemirror = getProseMirror();
    const computed = getComputedStyle(prosemirror);
    const margins = {
      top: pixelsToCm(parseInt(computed.paddingTop)),
      bottom: pixelsToCm(parseInt(computed.paddingBottom)),
      left: pixelsToCm(parseInt(computed.paddingLeft)),
      right: pixelsToCm(parseInt(computed.paddingRight)),
    };

    window.electronAPI.printAsPDF(div.innerHTML, margins);
  };

  return (
    <Dialog>
      <MenubarMenu>
        <MenubarTrigger className={menubarStyles.menubarTrigger}>
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => editor?.commands.clearContent()}>
            New
          </MenubarItem>
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
          <MenubarItem onClick={handlePrintAsPDF}>Print</MenubarItem>
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
  const [pageOrientation, setPageOrientation] =
    useState<PageOrientation>('portrait');
  const [margins, setMargins] = useState<Margins>({
    top: 2.54,
    bottom: 2.54,
    left: 2.54,
    right: 2.54,
  });
  const [columnCount, setColumnCount] = useState(1);
  const [columnSpacing, setColumnSpacing] = useState(3);

  useEffect(() => {
    const prosemirror = getProseMirror();
    const computed = getComputedStyle(prosemirror);

    if (computed.aspectRatio === '1 / 1.414') {
      setPageOrientation('portrait');
    } else if (computed.aspectRatio === '1.414') {
      setPageOrientation('landscape');
    }

    const newMargins: Margins = {
      top: pixelsToCm(parseInt(computed.paddingTop)),
      bottom: pixelsToCm(parseInt(computed.paddingBottom)),
      left: pixelsToCm(parseInt(computed.paddingLeft)),
      right: pixelsToCm(parseInt(computed.paddingRight)),
    };

    setMargins(newMargins);
  }, []);

  const handlePageOrientationChange = (newOrientation: string) => {
    if (newOrientation === 'portrait') {
      setPageOrientation('portrait');
    } else if (newOrientation === 'landscape') {
      setPageOrientation('landscape');
    }
  };

  const handleMarginChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (isNumber(e.currentTarget.value)) {
      const id = e.currentTarget.id;
      const newValue = Number(e.currentTarget.value);

      switch (id) {
        case 'margin-top':
          setMargins({ ...margins, top: newValue });
          break;
        case 'margin-bottom':
          setMargins({ ...margins, bottom: newValue });
          break;
        case 'margin-left':
          setMargins({ ...margins, left: newValue, right: newValue });
          break;
        default:
          console.error('An error occurred while updating margins!');
      }
    }
  };

  const handleColumnCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (isNumber(e.currentTarget.value)) {
      setColumnCount(Number(e.currentTarget.value));
    }
  };

  const handleColumnSpacingChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (isNumber(e.currentTarget.value)) {
      setColumnSpacing(Number(e.currentTarget.value));
    }
  };

  const handleSetDefault = () => {
    setPageOrientation('portrait');
    setMargins({
      top: 2.54,
      bottom: 2.54,
      left: 2.54,
      right: 2.54,
    });
    setColumnCount(1);
    setColumnSpacing(3);
  };

  const handleUpdatePageSetup = () => {
    const prosemirror = getProseMirror();

    if (pageOrientation === 'portrait') {
      prosemirror.style.aspectRatio = '1 / 1.414';
    } else if (pageOrientation === 'landscape') {
      prosemirror.style.aspectRatio = '1.414';
    }

    prosemirror.style.paddingTop = margins.top + 'cm';
    prosemirror.style.paddingBottom = margins.bottom + 'cm';
    prosemirror.style.paddingLeft = margins.left + 'cm';
    prosemirror.style.paddingRight = margins.left + 'cm';
    prosemirror.style.columnGap = margins.left + 1 + 'cm';
  };

  const styles = {
    radioInput:
      'border-slate-500 text-neutral-700 aria-checked:border-blue-400 focus-visible:border-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0',
    numberInput:
      'font-normal h-8 w-12 p-2 rounded border-slate-500 focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-0',
    margins: {
      inputDiv: 'flex items-center ml-px',
      label: 'w-28 font-normal',
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
              type='number'
              className={clsx(styles.numberInput, 'ml-px mt-1')}
              id='column-count'
              value={columnCount}
              onChange={handleColumnCountChange}
            />
          </div>
          <div>
            <Label htmlFor='column-spacing' className='font-semibold'>
              Column Spacing{' '}
              <span className='font-normal text-neutral-500'>(cm)</span>
            </Label>
            <Input
              type='number'
              className={clsx(styles.numberInput, 'ml-px mt-1')}
              id='column-spacing'
              value={columnSpacing}
              onChange={handleColumnSpacingChange}
            />
          </div>
        </div>
        <div className='ml-14'>
          <Label htmlFor='margins' className='font-semibold'>
            Margins <span className='font-normal text-neutral-500'>(cm)</span>
          </Label>
          <div className='mt-1 space-y-5' id='margins'>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-top' className={styles.margins.label}>
                Top
              </Label>
              <Input
                type='number'
                value={margins.top}
                onChange={handleMarginChange}
                className={styles.numberInput}
                id='margin-top'
              />
            </div>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-bottom' className={styles.margins.label}>
                Bottom
              </Label>
              <Input
                type='number'
                value={margins.bottom}
                onChange={handleMarginChange}
                className={styles.numberInput}
                id='margin-bottom'
              />
            </div>
            <div className={styles.margins.inputDiv}>
              <Label htmlFor='margin-left' className={styles.margins.label}>
                Left and Right
              </Label>
              <Input
                type='number'
                value={margins.left}
                onChange={handleMarginChange}
                className={styles.numberInput}
                id='margin-left'
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
          onClick={handleSetDefault}
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
              onClick={handleUpdatePageSetup}
            >
              OK
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}

type PageOrientation = 'portrait' | 'landscape';

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
