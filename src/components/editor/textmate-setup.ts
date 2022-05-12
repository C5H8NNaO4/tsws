import { loader } from '@monaco-editor/react';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { Registry } from 'monaco-textmate';
import { loadWASM } from 'onigasm';
import { theme, typescriptReactTM } from './assets';
import { asset } from 'lib/prepend-basepath';
import { withAsync } from 'lib/with-async';

loader.config({ paths: { vs: asset`monaco/min/vs` } });

export async function editorTextmateSetup() {
  if ('ts' in window) {
    return Promise.resolve(true);
  }

  return (window.preparation = prepare());
}

async function prepare() {
  try {
    window.monaco = await loader.init();
    window.monaco.editor.defineTheme('github', theme as any);

    await new Promise((resolve) => {
      // @ts-ignore
      global.require(['vs/language/typescript/tsWorker'], resolve);
    });

    await textMateIt();

    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
}

async function textMateIt() {
  try {
    // See https://www.npmjs.com/package/onigasm#light-it-up
    await loadWASM(asset`repl/onigasm.wasm`);

    const registry = new Registry({
      async getGrammarDefinition() {
        return {
          format: 'json',
          content: typescriptReactTM,
        };
      },
    });

    // map of monaco "language id's" to TextMate scopeNames
    const grammars = new Map();
    grammars.set('typescript', 'source.tsx');

    await wireTmGrammars(window.monaco, registry, grammars);
  } catch (e) {}

  window.__textMateIt = true;
}
