import * as monaco from 'monaco-editor';

export const EditorOptions: Partial<monaco.editor.IStandaloneEditorConstructionOptions> = {
  fontSize: 15.2,
  fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono"',
  scrollBeyondLastLine: false,
  scrollbar: {
    useShadows: false,
    vertical: 'auto',
    horizontal: 'auto',
    alwaysConsumeMouseWheel: true,
  },
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true,
  },
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'on',
  minimap: { enabled: false },
  lightbulb: { enabled: true },
  inlayHints: { enabled: true },
  bracketPairColorization: {
    enabled: true,
  },
};
