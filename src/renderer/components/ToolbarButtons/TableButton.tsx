import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@/src/renderer/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/renderer/ui/dropdown-menu';
import { Table } from 'lucide-react';
import { toolbarStyles } from '../Toolbar';

export default function TableButton() {
  const { editor } = useCurrentEditor();

  const handleCreateTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
      .run();
  };

  const handleDeleteTable = () => {
    editor?.chain().focus().deleteTable().run();
  };

  const handleAddRow = () => {
    editor?.chain().focus().addRowAfter().run();
  };

  const handleAddColumn = () => {
    editor?.chain().focus().addColumnAfter().run();
  };

  const handleDeleteRow = () => {
    editor?.chain().focus().deleteRow().run();
  };

  const handleDeleteColumn = () => {
    editor?.chain().focus().deleteColumn().run();
  };

  const handleMerge = () => {
    editor?.chain().focus().mergeOrSplit().run();
  };

  const deleteTableDisabled = !editor?.can().deleteTable();
  const mergeDisabled = !editor?.can().mergeOrSplit();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={toolbarStyles.iconButton}
        >
          <Table className={toolbarStyles.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleCreateTable}>
          Create Table
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteTable}
          disabled={deleteTableDisabled}
        >
          Delete Table
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddRow}>Add Row</DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddColumn}>
          Add Column
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteRow}>
          Delete Row
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteColumn}>
          Delete Column
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMerge} disabled={mergeDisabled}>
          Merge
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
