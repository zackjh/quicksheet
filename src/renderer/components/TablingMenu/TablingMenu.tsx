import { Editor, useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './TablingMenu.css';

export default function TablingMenu() {
  const { editor } = useCurrentEditor();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        id='table-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faTable} />
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
              .run()
          }
        >
          Create Table
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
        >
          Delete Table
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
          Add Row
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
          Add Column
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
          Delete Row
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
          Delete Column
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().mergeOrSplit().run()}
          disabled={!editor.can().mergeOrSplit()}
        >
          {editor.can().splitCell() ? 'Split' : 'Merge'}
        </MenuItem>
      </Menu>
    </>
  );
}

function InsertTableButton({ editor }: { editor: Editor }) {
  return (
    <div
      onClick={() =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
          .run()
      }
    >
      Insert Table
    </div>
  );
}

function InsertRowButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().addRowAfter().run()}>
      Insert Row
    </button>
  );
}
function InsertColumnButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
      Insert Column
    </button>
  );
}

function DeleteColumnButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().deleteColumn().run()}>
      Delete Column
    </button>
  );
}

function DeleteRowButton({ editor }: { editor: Editor }) {
  return (
    <button onClick={() => editor.chain().focus().deleteRow().run()}>
      Delete Row
    </button>
  );
}

function ToggleMergeCellButton({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().mergeOrSplit().run()}
      disabled={!editor.can().mergeOrSplit()}
    >
      mergeOrSplit
    </button>
  );
}
