import { browser } from '@wdio/globals'
import { Key } from 'webdriverio';


async function cleareditor(editor: WebdriverIO.Element) {
  await browser.keys([Key.Ctrl, 'a'])
  await browser.keys('Backspace')
}


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
        await browser.pause(10); // Pause between keystrokes to simulate real typing speed
    }

    // Optionally, verify the text was entered correctly
    // Note: This might need adjustment based on how Tiptap updates the DOM
    const text = await editor.getText();
    await expect(text).toContain('Hello, this is a test typing into Tiptap!');

    await browser.pause(1000); // Pause to observe the typed text
  });
  })
  describe('Test inserting text with bold,italic, underline', () => {
    it('Changing text marks', async () => {
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');

      // Click the editor to focus it
    await editor.click()
    await browser.keys([Key.Ctrl, 'a'])
    await browser.keys([Key.Ctrl, 'b'])
    await expect(editor).toHaveHTML(expect.stringContaining('<strong>Hello, this is a test typing into Tiptap!</strong>'));
    await browser.keys([Key.Ctrl, 'a'])
    await browser.keys([Key.Ctrl, 'i'])
    await expect(editor).toHaveHTML(expect.stringContaining('<em>Hello, this is a test typing into Tiptap!</em>'));
    await browser.keys([Key.Ctrl, 'u'])
    await expect(editor).toHaveHTML(expect.stringContaining('<u>Hello, this is a test typing into Tiptap!</u>'));

    await browser.pause(1000)
    await cleareditor(editor)


  })
  })

describe('Test inserting text with bullet points', () => {
  it('creating bullet lists', async () => {
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');

      // Click the editor to focus it
    await editor.click()
    await browser.keys('-')
    await browser.keys(' ')
    await browser.keys('hi')
    await expect(editor).toHaveHTML(expect.stringContaining('<ul><li><p>hi</p></li></ul>'));
    await cleareditor(editor)
    await editor.click()
    await browser.keys('1')
    await browser.keys('.')
    await browser.keys(' ')
    await browser.keys('hi')
    await expect(editor).toHaveHTML(expect.stringContaining('<ol><li><p>hi</p></li></ol>'));
    await cleareditor(editor)
  })
})

describe('Test inserting text into codeblock', () => {
  it('Types text successfully', async () => {
    // Assuming the Tiptap editor is uniquely identified by a class 'tiptap-editor'
    // Adjust the selector based on your actual implementation
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');
    // Using the class of the SVG icon to find the button
    const codeButton = await $('button svg.lucide-code').$('..');

    // Click the editor to focus it

    await editor.click();

    //Clear editor
    await cleareditor(editor);

    await codeButton.click();
    await editor.click();

    const txt = 'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}';
    for (const char of txt) {
        await browser.keys(char);
        await browser.pause(10); // Pause between keystrokes to simulate real typing speed
    }


    const selectDropdown = await $('select[contenteditable="false"]');
    await selectDropdown.click();


    await selectDropdown.selectByAttribute('value', 'js');


    const selectedValue = await selectDropdown.getValue();
    await expect(selectedValue).toEqual('js');

    const text = await editor.getText();
    await expect(text).toContain(txt);

    //check for loop formatting
    const keywordSpan = await $('.hljs-keyword');
    const spanText = await keywordSpan.getText();
    await expect(spanText).toContain('for');

    //check console formatting
    const consoleSpan = await $('.hljs-variable.language_');
    const spanText2 = await consoleSpan.getText();
    await expect(spanText2).toEqual('console');

    await browser.pause(2000); // Pause to observe the typed text
  });
})

describe('Test inserting a Latex equation', () => {

  it('Clear text successfully', async () => {
    // Assuming the Tiptap editor is uniquely identified by a class 'tiptap-editor'
    // Adjust the selector based on your actual implementation

    // Using the class of the SVG icon to find the button
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');
    // Click the editor to focus it
    await editor.click();

    // Clear editor
    await cleareditor(editor);
    const placeholderText = await $('p.is-empty.is-editor-empty').getAttribute('data-placeholder');
    await expect(placeholderText).toEqual('Write something …');
  });

  it('Types y=mx +c successfully', async () => {
    const txt = '$ Y = MX +C $\n $ \\sin(x) $\n $ \\tan(x) $\n $ \\cos(x) $\n $ \\log(x) $\n $ \\ln(x) $ \n $ \\sqrt{x} $\n $ \\frac{1}{x} $ \n $ \\sum_{i=0}^n x_i $ \n $\\int_a^b x^2 dx$ \n $\\binom{n}{k}$ \n $\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right.$ ';
    for (const char of txt) {
        await browser.keys(char);
        await browser.pause(10); // Pause between keystrokes to simulate real typing speed
    }
    const editor = await $('.tiptap.ProseMirror[contenteditable="true"]');
    const editorttext = await editor.getText();

    await expect(editorttext).toContain('Y=MX+C');
    await expect(editorttext).toContain('sin(x)');
    await expect(editorttext).toContain('tan(x)');
    await expect(editorttext).toContain('cos(x)');
    await expect(editorttext).toContain('log(x)');
    await expect(editorttext).toContain('ln(x)');
    await expect(editorttext).toContain('∑');
    await expect(editorttext).toContain('∫');
    await expect(editorttext).toContain('otherwise');
    await expect(editorttext).not.toContain('$');

    await browser.pause(2000)
  })
})
