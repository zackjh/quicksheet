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

export default function CodeBlockNode({
  node,
  updateAttributes,
  extension,
}: CodeBlockNodeProps) {
  const defaultLanguage = node.attrs.language;

  return (
    <NodeViewWrapper className='codeBlock'>
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value='null'>auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as='code' />
      </pre>
    </NodeViewWrapper>
  );
}
