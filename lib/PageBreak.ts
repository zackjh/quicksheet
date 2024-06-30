import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Add a hard break
       * @example editor.commands.setPageBreak()
       */
      setPageBreak: () => ReturnType;
    };
  }
}

const PageBreak = Node.create({
  name: 'pageBreak',

  group: 'block',

  parseHTML() {
    return [
      {
        tag: 'hr.page-break',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes, { class: 'page-break' })];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands, chain, state, editor }) => {
          return chain().insertContent('<hr class="page-break">').run();
        },
    };
  },

  // Disabled while page breaks are still WIP
  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Enter': () => this.editor.commands.setPageBreak(),
  //   };
  // },
});

export default PageBreak;
