import { browser } from '@wdio/globals'

describe('Checking place holder', () => {
    it('Place Holder Exists', async () => {
      const placeholderText = await $('p.is-empty.is-editor-empty').getAttribute('data-placeholder');
      await expect(placeholderText).toEqual('Write something …');
      await browser.pause(2000)
    })
})
describe('Test inserting text', () => {
  it('Types text successfully', async () => {
    // Assuming the Tiptap editor is uniquely identified by a class 'tiptap-editor'
    // Adjust the selector based on your actual implementation
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');

    // Click the editor to focus it
    await editor.click();

    // Simulate typing text into the editor like a user
    const textToType = 'Hello, this is a test typing into Tiptap!';
    for (const char of textToType) {
        await browser.keys(char);
        await browser.pause(100); // Pause between keystrokes to simulate real typing speed
    }

    // Optionally, verify the text was entered correctly
    // Note: This might need adjustment based on how Tiptap updates the DOM
    const text = await editor.getText();
    await expect(text).toContain('Hello, this is a test typing into Tiptap!');

    await browser.pause(5000); // Pause to observe the typed text
  });
  })
