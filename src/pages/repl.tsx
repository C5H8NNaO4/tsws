import * as React from 'react';
import ReactDOM from 'react-dom/client';
import Head from 'next/head';
import { Hook } from 'console-feed';
import { RenderUtils } from 'container/tutorial/render-utils';

function Repl() {
  window.log = console.log.bind(window.console);

  window.React = React;
  window.ReactDOM = ReactDOM as any;

  RenderUtils.codeNode = React.useRef<HTMLScriptElement>(null);
  RenderUtils.state = document.createElement('div');

  const sendMessage = RenderUtils.sendMessage.bind(RenderUtils);
  const onMessage = RenderUtils.onMessage.bind(RenderUtils);
  const onError = RenderUtils.renderError.bind(RenderUtils);

  window.onmessage = onMessage;
  window.onerror = onError;

  React.useEffect(() => {
    Hook(window.console, sendMessage);
    RenderUtils.initialize();
  }, []);

  return (
    <>
      <Head>
        <title>Repl</title>
        <style data-initial={true}>{``}</style>
      </Head>

      <script
        type="inline-module"
        id="code"
        data-initial="true"
        data-thecode="true"
        ref={RenderUtils.codeNode}
      />
    </>
  );
}

export default Repl;
