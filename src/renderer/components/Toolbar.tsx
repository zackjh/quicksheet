import ImportButton from './ToolbarButtons/ImportButton';
import ExportButton from './ToolbarButtons/ExportButton';
import UndoButton from './ToolbarButtons/UndoButton';
import RedoButton from './ToolbarButtons/RedoButton';
import BoldButton from './ToolbarButtons/BoldButton';
import ItalicButton from './ToolbarButtons/ItalicButton';
import UnderlineButton from './ToolbarButtons/UnderlineButton';
import ChangeTextColorButton from './ToolbarButtons/ChangeTextColorButton';
import HighlightButton from './ToolbarButtons/HighlightButton';
import CodeBlockButton from './ToolbarButtons/CodeBlockButton';
import AlignLeftButton from './ToolbarButtons/AlignLeftButton';
import AlignCenterButton from './ToolbarButtons/AlignCenterButton';
import AlignRightButton from './ToolbarButtons/AlignRightButton';
import AlignJustifyButton from './ToolbarButtons/AlignJustifyButton';
import UnorderedListButton from './ToolbarButtons/UnorderedListButton';
import OrderedListButton from './ToolbarButtons/OrderedListButton';
import IndentDecreaseButton from './ToolbarButtons/IndentDecreaseButton';
import IndentIncreaseButton from './ToolbarButtons/IndentIncreaseButton';
import TableButton from './ToolbarButtons/TableButton';
import PrintButton from './ToolbarButtons/PrintButton';

export const toolbarStyles = {
  iconButton:
    'bg-slate-200 rounded w-7 h-7 m-px text-neutral-700 hover:bg-slate-300 active:bg-slate-400',
  iconButtonActive: 'bg-blue-200 hover:bg-blue-200',
  icon: 'w-4 h-4',
};

export default function Toolbar() {
  return (
    <div className='bg-slate-200 h-9 m-5 px-3 rounded-full flex items-center'>
      <ImportButton />
      <ExportButton />
      <PrintButton />
      <UndoButton />
      <RedoButton />
      <BoldButton />
      <ItalicButton />
      <UnderlineButton />
      <ChangeTextColorButton />
      <HighlightButton />
      <CodeBlockButton />
      <AlignLeftButton />
      <AlignCenterButton />
      <AlignRightButton />
      <AlignJustifyButton />
      <UnorderedListButton />
      <OrderedListButton />
      <IndentDecreaseButton />
      <IndentIncreaseButton />
      <TableButton />
    </div>
  );
}
