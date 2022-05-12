import MonacoEditor from '@monaco-editor/react';
import type * as monaco from 'monaco-editor/min/vs/editor/editor.main';
import { useReplContext } from 'components/repl/context';
import { visibleAssets } from 'lib/visible-assets';
import React, { useEffect, useRef, useState } from 'react';
import { EditorOptions } from './options';
import { Sandbox } from './sandbox';
import { EditorLanguage } from './types';
import { withAsync } from 'lib/with-async';

type SBT = ReturnType<typeof Sandbox>;

export const Editor = ({ onInit, onChange: gonChange, onValidation }: any) => {
  const { tutorial, currentAsset } = useReplContext();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const [sandbox, setSandbox] = useState<SBT>();

  const onMount = async (editor, Monaco) => {
    await withAsync(() => window.ts && window.Babel);

    setSandbox(Sandbox(editor, Monaco));

    editorRef.current = editor;
    onInit({ editor });
  };

  useEffect(() => {
    if (!sandbox) return;

    const assets = visibleAssets(tutorial);
    assets.forEach((asset) => {
      // asset.editorModel = asset.editorModel || sandbox.toModel(asset);
      asset.editorModel = sandbox.toModel(asset);
    });

    // const asset = currentAsset; //;assets.find((m) => m.path === currentAsset.path);

    // if (asset) {
    editorRef.current.setModel(currentAsset.editorModel);
    editorRef.current.setValue(editorRef.current.getValue());
    // }
  }, [sandbox, editorRef, tutorial]);

  // useEffect(() => {
  //   if (!sandbox) return;
  //   sandbox.clear();
  //
  //   const assets = visibleAssets(tutorial);
  //
  //   const path = (currentAsset || assets[0]).path;
  //   const asset = assets.find((m) => m.path === path);
  //
  //   if (asset) {
  //     editorRef.current.setModel(asset.editorModel);
  //     editorRef.current.setValue(editorRef.current.getValue());
  //   }
  // }, [sandbox, tutorial]);

  // @todo - bei tests alle assets durchloopen
  async function onChange() {
    const rawFiles = (await sandbox!.getEmitResult()).outputFiles;
    const main = rawFiles.find((f) => f.name.match(/\.jsx?$/));
    const jsCode = main!.text;
    const declaration = rawFiles.find((f) => f.name.endsWith('d.ts'))!.text;
    const jsx = main!.name.endsWith('jsx');

    gonChange(jsCode, declaration, jsx);
  }

  function onValidate(markers: monaco.editor.IMarker[]) {
    const text: string[] = markers
      .sort((a, b) => a.startLineNumber - b.startLineNumber)
      .map((r) => [r.startLineNumber, r.message.replace('\n', '\n\t')].join(':\t'));

    onValidation(text);
  }

  return (
    <MonacoEditor
      language={EditorLanguage.ts}
      path="/foo/egal.tsx"
      theme="github"
      onMount={onMount}
      onChange={onChange}
      onValidate={onValidate}
      options={{ ...EditorOptions }}
      height="calc(100vh - 50%)"
    />
  );
};
