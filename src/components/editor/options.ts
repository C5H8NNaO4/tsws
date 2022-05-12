import * as monaco from 'monaco-editor';

const isAndroid = navigator && /android/i.test(navigator.userAgent);

export const EditorOptions: Partial<monaco.editor.IStandaloneEditorConstructionOptions> =
  {
    fontSize: 16,
    fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono"',
    scrollBeyondLastLine: false,
    scrollbar: {
      useShadows: false,
      vertical: 'auto',
      horizontal: 'auto',
      alwaysConsumeMouseWheel: true,
    },
    quickSuggestions: {
      other: !isAndroid,
      comments: !isAndroid,
      strings: !isAndroid,
    },
    acceptSuggestionOnCommitCharacter: !isAndroid,
    acceptSuggestionOnEnter: !isAndroid ? 'on' : 'off',
    accessibilitySupport: !isAndroid ? 'on' : 'off',
    minimap: { enabled: false },
    lightbulb: { enabled: true },
    inlayHints: { enabled: true },
    bracketPairColorization: {
      enabled: true,
    },
  };
