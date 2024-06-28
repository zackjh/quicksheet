import Divider from '@/src/renderer/components/Toolbar/ToolbarButtons/Divider';
import UndoButton from '@/src/renderer/components/Toolbar/ToolbarButtons/UndoButton';
import RedoButton from '@/src/renderer/components/Toolbar/ToolbarButtons/RedoButton';
import DeletePageButton from '@/src/renderer/components/Toolbar/ToolbarButtons/DeletePageButton';
import AddPageButton from '@/src/renderer/components/Toolbar/ToolbarButtons/AddPageButton';
import FontSelect from '@/src/renderer/components/Toolbar/ToolbarButtons/FontSelect';
import FontSize from '@/src/renderer/components/Toolbar/ToolbarButtons/FontSize';
import BoldButton from '@/src/renderer/components/Toolbar/ToolbarButtons/BoldButton';
import ItalicButton from '@/src/renderer/components/Toolbar/ToolbarButtons/ItalicButton';
import UnderlineButton from '@/src/renderer/components/Toolbar/ToolbarButtons/UnderlineButton';
import ChangeTextColorButton from '@/src/renderer/components/Toolbar/ToolbarButtons/ChangeTextColorButton';
import HighlightButton from '@/src/renderer/components/Toolbar/ToolbarButtons/HighlightButton';
import CodeBlockButton from '@/src/renderer/components/Toolbar/ToolbarButtons/CodeBlockButton';
import AlignLeftButton from '@/src/renderer/components/Toolbar/ToolbarButtons/AlignLeftButton';
import AlignCenterButton from '@/src/renderer/components/Toolbar/ToolbarButtons/AlignCenterButton';
import AlignRightButton from '@/src/renderer/components/Toolbar/ToolbarButtons/AlignRightButton';
import AlignJustifyButton from '@/src/renderer/components/Toolbar/ToolbarButtons/AlignJustifyButton';
import UnorderedListButton from '@/src/renderer/components/Toolbar/ToolbarButtons/UnorderedListButton';
import OrderedListButton from '@/src/renderer/components/Toolbar/ToolbarButtons/OrderedListButton';
import IndentDecreaseButton from '@/src/renderer/components/Toolbar/ToolbarButtons/IndentDecreaseButton';
import IndentIncreaseButton from '@/src/renderer/components/Toolbar/ToolbarButtons/IndentIncreaseButton';
import TableButton from '@/src/renderer/components/Toolbar/ToolbarButtons/TableButton';

export const toolbarStyles = {
  iconButton:
    'm-px h-7 w-7 rounded bg-slate-200 text-neutral-700 ring-inset hover:bg-slate-300 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0 active:bg-slate-400',
  iconButtonActive: 'bg-blue-200 hover:bg-blue-200',
  icon: 'h-4 w-4',
};

export default function Toolbar() {
  return (
    <div className='mx-5 mb-5 flex h-9 items-center rounded-full bg-slate-200 px-3'>
      <UndoButton />
      <RedoButton />
      <Divider />
      <DeletePageButton />
      <AddPageButton />
      <Divider />
      <FontSelect />
      <Divider />
      <FontSize />
      <Divider />
      <BoldButton />
      <ItalicButton />
      <UnderlineButton />
      <ChangeTextColorButton />
      <HighlightButton />
      <CodeBlockButton />
      <Divider />
      <AlignLeftButton />
      <AlignCenterButton />
      <AlignRightButton />
      <AlignJustifyButton />
      <Divider />
      <UnorderedListButton />
      <OrderedListButton />
      <IndentDecreaseButton />
      <IndentIncreaseButton />
      <TableButton />
    </div>
  );
}
