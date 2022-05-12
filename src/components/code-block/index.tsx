import getConfig from 'next/config';
import React, { isValidElement, useEffect, useState } from 'react';
import * as Shiki from 'shiki';

const {
  publicRuntimeConfig: { basePath },
} = getConfig();

Shiki.setCDN(`${basePath}/shiki/`);

const highlighterPromise = Shiki.getHighlighter({
  langs: ['css', 'html', 'javascript', 'json', 'sh', 'typescript', 'tsx'],
  theme: 'github-light',
});

export const CodeBlock = (props: any) => {
  const { children } = props;

  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return (
      <div>
        <pre tabIndex={0} className={`shiki`}>
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  const code = Array.guard(props.children).join('');
  const [innerHtml, setHtml] = useState(code);

  useEffect(() => {
    highlighterPromise.then((highlighter) => setHtml(highlighter.codeToHtml(code, 'js')));
  }, [code]);

  return (
    <div className={props.className} dangerouslySetInnerHTML={{ __html: innerHtml }} />
  );
};
