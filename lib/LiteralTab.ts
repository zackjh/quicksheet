import { Extension } from '@tiptap/core';

// IMPORTANT: LiteralTab must be placed before StaterKit or ListItem extension(s) in order to retain
// the default 'indent using Tab' keyboard shortcut for lists

// This extension also disables the 'Shift-Tab' keyboard shortcut
export const LiteralTab = Extension.create({
  name: 'literalTab',
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent('\t');
      },
      'Shift-Tab': () => {
        return this.editor.commands.insertContent('');
      },
    };
  },
});
