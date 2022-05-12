import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Console as ConsoleFeed } from 'console-feed';
import dynamic from 'next/dynamic';
import { ReplPlugin } from 'components/repl/plugins/index';

const IFrame = dynamic(
  async () => {
    const res = await import('components/repl/frame');
    return res.Frame;
  },
  { ssr: false },
);

const getNumberStringWithWidth = (num: Number, width: number) => {
  const str = num.toString();
  if (width > str.length) return '0'.repeat(width - str.length) + str;
  return str.substring(0, width);
};

const getTimestamp = () => {
  const date = new Date();
  const h = getNumberStringWithWidth(date.getHours(), 2);
  const min = getNumberStringWithWidth(date.getMinutes(), 2);
  const sec = getNumberStringWithWidth(date.getSeconds(), 2);
  const ms = getNumberStringWithWidth(date.getMilliseconds(), 3);
  return `${h}:${min}:${sec}.${ms}`;
};
const id = () => getTimestamp().replaceAll(/\D/g, '');
const sendMessageTimeout = 2000;

export const Console = (): ReplPlugin => {
  const [jsConsole, setJsConsole] = useState<any[]>([]);
  const [jsx, setJsx] = useState(false);
  const iFrame = useRef<HTMLIFrameElement>();

  function clearTimeouts() {
    'reloadTimeout replTimeout'.split(' ').forEach((to) => {
      window.clearTimeout(window[to]);
      delete window[to];
    });
  }

  const onMessage = (msg) => {
    if (msg.data.renderer === 'init') {
      return setJsConsole([]);
    }

    const addLog = (log) =>
      // log.timestamp = getTimestamp();
      setJsConsole((logs) => [...logs, log]);

    Array.guard(msg.data.renderer).filter(Boolean).forEach(addLog);
  };

  useEffect(() => {
    window.onmessage = onMessage;

    return () => {
      window.onmessage = null;
      clearTimeouts();
    };
  }, []);

  function reloadFrame() {
    clearTimeouts();
    iFrame.current?.contentDocument?.location.reload();
  }

  function postMessage(message: object) {
    iFrame.current?.contentWindow?.postMessage(message);
  }

  function sendIframeClear() {
    postMessage({ clear: true });
  }

  function runJsCode(code: string, timeout = sendMessageTimeout) {
    clearTimeouts();
    sendIframeClear();

    window.replTimeout = setTimeout(() => {
      postMessage({ repl: { code, id: id() } });
    }, timeout);
  }

  const render = () => (
    <div className="flex overflow-hidden">
      <div className="h-[calc(50vh-123px)] w-[100%] flex-col overflow-hidden">
        <strong className="m-4 block text-xs">Console</strong>
        <div className="h-[calc(50vh-148px)] max-h-[calc(50vh-148px)] overflow-y-auto">
          <ConsoleFeed
            logs={jsConsole}
            styles={{
              BASE_FONT_FAMILY:
                'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono"',
              BASE_FONT_SIZE: '1em',
              BASE_LINE_HEIGHT: '24px',
              ARROW_FONT_SIZE: '1em',
              TREENODE_FONT_SIZE: '1em',
              BASE_BACKGROUND: 'transparent',
            }}
          />
        </div>
      </div>

      <IFrame
        iframeSrc={'repl'}
        data-initial="true"
        onLoad={(iframe: HTMLIFrameElement) => (iFrame.current = iframe)}
        className={`w-[100%] flex-col ${!jsx && 'hidden'}`}
      />
    </div>
  );

  return {
    name: 'Output',
    reset: () => {
      clearTimeouts();
      sendIframeClear();
      setJsConsole([]);
    },
    render,
    onInit: () => reloadFrame(),
    setValue: ({ js, jsx }) => {
      setJsx(jsx);
      // iFrame.current!.style.visibility = jsx ? '' : 'hidden';
      runJsCode(js);
    },
  };
};
