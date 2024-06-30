import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

interface CodeBlockNodeProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

const supportedLanguages: { [key: string]: string } = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  ts: 'TypeScript',
  python: 'Python',
  c: 'C',
  cpp: 'C++',
};

export default function CodeBlockComponent({
  node,
  updateAttributes,
  extension,
}: CodeBlockNodeProps) {
  const defaultLanguage = node.attrs.language;

  return (
    <NodeViewWrapper className='relative'>
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
        className='absolute right-2 top-2 rounded border border-neutral-200 text-xs focus:outline-none'
      >
        <option value='null'>Auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .filter((lang) => Object.keys(supportedLanguages).includes(lang))
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {supportedLanguages[lang]}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as='code' />
      </pre>
    </NodeViewWrapper>
  );
}
