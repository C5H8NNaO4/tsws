import clsx from 'clsx';
import dynamic from 'next/dynamic';

import * as monaco from 'monaco-editor';
import * as React from 'react';

import { File } from 'components/file-list/file';
import { FileList } from 'components/file-list';
import { visibleAssets } from 'lib/visible-assets';
import { EditorLanguage } from 'components/editor/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReplContext } from './context';
import type { ReplPluginsType } from 'components/repl/plugins';
import { Console, Declaration, Errors, JsCode } from 'components/repl/plugins';

export * from './context';

declare global {
  interface Window {
    [key: string]: any;
  }
}

const Editor = dynamic(
  async () => {
    const res = await import('components/editor');
    return res.Editor;
  },
  {
    ssr: false,
  },
);

export function Repl(props: any) {
  const { tutorial, currentAsset, setCurrentAsset } = useReplContext();

  const plugins: ReplPluginsType = {
    jsCode: JsCode(),
    console: Console(),
    declaration: Declaration(),
    errors: Errors(),
  };

  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [tabName, setTabName] = useState<string>(plugins.jsCode.name);

  const switchTab = (tab: string) => setTabName(tab);
  const showTab = (name: string) =>
    clsx({ [name]: tabName === name, hidden: tabName !== name });

  const allPlugins = (fn: (any, number) => any) => {
    return Object.values(plugins).map((p, i) => fn(p, i));
  };

  const reset = (tsc = false) => allPlugins((p) => p.reset({ tsc }));

  useEffect(() => {
    reset(true);
  }, [tutorial]);

  useEffect(() => {
    if (!editor.current) return;
    if (!currentAsset) return;
    if (!currentAsset.editorModel || currentAsset.editorModel.isDisposed()) return;

    try {
      editor.current.setModel(currentAsset.editorModel);
      editor.current.setValue(editor.current.getValue());
    } catch (error) {
      console.error(error);
    }
  }, [currentAsset]);

  const onChange = (js: string, declaration: string, jsx: boolean) => {
    allPlugins((p) => {
      p.reset(false);
      p.setValue({ js, declaration, jsx });
    });
  };

  const onInit = (args: any) => {
    editor.current = args.editor;

    props.onInit(args);
    allPlugins((p) => p.onInit?.call(args));
  };

  const onValidation = plugins.errors.setTscErrors;
  const assets = visibleAssets(tutorial);

  return (
    <>
      <FileList editable={false}>
        {assets.map((tab, i) => (
          <File
            key={i}
            label={tab.path.split('/').reverse()[0]}
            active={tab.path == currentAsset.path}
            onClick={() => setCurrentAsset(tab)}
          />
        ))}
      </FileList>

      <Editor onInit={onInit} onChange={onChange} onValidation={onValidation} />

      <FileList>
        {allPlugins((plug: any, i: number) => (
          <File
            key={`plugin${i}`}
            active={tabName == plug.name}
            label={plug.name}
            onClick={() => switchTab(plug.name)}
          />
        ))}
      </FileList>

      <div className="repl-tabs w-full overflow-auto p-1">
        {allPlugins((plug: any, i: number) => (
          <div className={showTab(plug.name)} key={`render${i}`}>
            {plug.render()}
          </div>
        ))}
      </div>
    </>
  );
}
