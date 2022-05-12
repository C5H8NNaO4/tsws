import dynamic from 'next/dynamic';
import * as React from 'react';
import { useState } from 'react';
import { ReplPlugin } from 'components/repl/plugins/index';

const CodeBlock = dynamic(
  async () => {
    const res = await import('components/code-block');
    return res.CodeBlock;
  },
  {
    ssr: false,
  },
);

export const JsCode = (): ReplPlugin => {
  const [value, setValue] = useState('');
  const updateValue = ({ js }) => {
    setValue(js);
  };

  return {
    name: 'JavaScript',
    setValue: updateValue,
    reset: () => setValue(''),
    render: () => <CodeBlock language="js">{value}</CodeBlock>,
  };
};

export const Declaration = (): ReplPlugin => {
  const [value, setValue] = useState('');
  const updateValue = ({ declaration }) => {
    setValue(declaration);
  };

  return {
    name: 'Declaration',
    setValue: updateValue,
    reset: () => setValue(''),
    render: () => <CodeBlock language="ts">{value}</CodeBlock>,
  };
};

export const Errors = (): ReplPlugin => {
  const [tscErrors, setTscErrors] = useState([]);

  const render = () => (
    <pre className="shiki">
      <code>
        {tscErrors.map((e, i) => (
          <span key={`error${i}`} className="line">
            {e + '\n'}
          </span>
        ))}
      </code>
    </pre>
  );

  return {
    name: 'Errors',
    reset: ({ tsc }) => {
      tsc && setTscErrors([]);
    },
    render,
    setValue: (_) => {},
    setTscErrors,
  };
};
