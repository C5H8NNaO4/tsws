import * as React from 'react';
import type { Tutorial, TutorialAsset } from 'contentlayer/generated';
import type * as monaco from 'monaco-editor/min/vs/editor/editor.main';

export interface ReplTutorial extends Tutorial {
  assets: ReplAsset[];
}

export interface ReplAsset extends TutorialAsset {
  uri: monaco.Uri;
  editorModel: monaco.editor.ITextModel;
}

type SetFn<T> = (x: T) => void;

type ReplContextType = {
  tutorial: ReplTutorial;
  setTutorial: SetFn<Tutorial>;

  currentAsset: ReplAsset;
  setCurrentAsset: SetFn<ReplAsset>;
};

const ReplContext = React.createContext<ReplContextType>({} as any);
const useReplContext = () => React.useContext(ReplContext);
export { ReplContext, useReplContext };
