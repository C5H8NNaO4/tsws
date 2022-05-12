import * as Monaco from 'monaco-editor';
import { setupTypeAcquisition } from '@typescript/ata';
import TypeScriptWorker = Monaco.languages.typescript.TypeScriptWorker;
import { EditorLanguage } from 'components/editor/types';

type MonacoType = typeof Monaco;

interface EmitOutput {
  outputFiles: OutputFile[];
  emitSkipped: boolean;
}

export interface OutputFile {
  name: string;
  text: string;
  writeByteOrderMark: boolean;
}

function Try(fn) {
  try {
    fn();
  } catch {}
}

export const Sandbox = (
  editor: Monaco.editor.IStandaloneCodeEditor,
  monaco: MonacoType,
) => {
  const isJSLang = false;
  const getWorker = monaco.languages.typescript.getTypeScriptWorker;

  const getWorkerProcess = async (uri: any): Promise<TypeScriptWorker> => {
    const worker = await getWorker();
    return worker(uri);
  };

  const getEmitResult = async (): Promise<EmitOutput> => {
    const model = models.get()!;
    const process = await getWorkerProcess(model.uri);

    return await process.getEmitOutput(model.uri.toString());
  };

  const models = {
    rm: (model?) => model?.dispose(),

    all: () => monaco.editor.getModels(),

    get: (uri?: Monaco.Uri) => (uri ? models.find(uri) : editor.getModel()),

    find: (uri: Monaco.Uri) => monaco.editor.getModel(uri),

    clear: () => models.all().forEach((m) => Try(() => m.dispose())),

    create: (path, language, content, mode: 'force' | 'skip' = 'skip') => {
      const uri = monaco.Uri.file(path);
      const current = models.find(uri);

      if (current && mode === 'skip') {
        return;
      }

      models.rm(current);

      return monaco.editor.createModel(content, language, uri);
    },

    toModel: ({ content, path }: any) => {
      return models.create(path, EditorLanguage.ts, content, 'force')!;
    },
  };

  const getText = () => models.get()?.getValue();

  const defaults = isJSLang
    ? monaco.languages.typescript.javascriptDefaults
    : monaco.languages.typescript.typescriptDefaults;

  defaults.setDiagnosticsOptions({
    ...defaults.getDiagnosticsOptions(),
    noSemanticValidation: false,
    diagnosticCodesToIgnore: [2354, 2584],
  });

  defaults.setCompilerOptions({
    allowJs: isJSLang,
    checkJs: isJSLang,
    pretty: true,

    declaration: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    importHelpers: true,

    noEmitOnError: false,
    noEmitHelpers: true,

    strict: true,
    alwaysStrict: true,
    strictNullChecks: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    noStrictGenericChecks: true,
    strictPropertyInitialization: true,
    allowSyntheticDefaultImports: true,

    preserveConstEnums: false,
    removeComments: false,

    noImplicitAny: true,
    noImplicitThis: true,
    noImplicitReturns: true,

    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    jsxFactory: 'React.createElement',
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    isolatedModules: false,

    noUnusedLocals: false,
    noUnusedParameters: false,

    skipLibCheck: true,
    downlevelIteration: false,

    types: ['react', 'react-dom'],
  });

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

  const addLibraryToRuntime = (code: string, _path: string) => {
    const path = `file://${_path}`;

    defaults.addExtraLib(code, path);

    models.create(path, EditorLanguage.js, code, 'skip');

    console.debug(`[ATA] Adding ${path} to runtime`);
  };

  const ata = setupTypeAcquisition({
    projectName: 'TypeScript Playground',
    typescript: window.ts,
    logger: console,
    delegate: {
      receivedFile: addLibraryToRuntime,
      // progress: (downloaded: number, total: number) => {
      // console.debug({ ATA: { downloaded, total } });
      // },
      errorMessage: (userFacingMessage: string, error: Error) => {
        console.debug('[ATA] ' + userFacingMessage, error);
      },
      started: () => {
        console.debug('[ATA] start');
      },
      finished: () => {
        console.debug('[ATA] done');
      },
    },
  });

  const doAta = () => {
    clearTimeout(window.ataTimer);
    const code = getText()!.replaceAll(/^import .+ from '\..+$/gm, '');
    window.ataTimer = setTimeout(() => ata(code), 500);
  };

  editor.onDidChangeModelContent(doAta);

  return {
    clear: models.clear,
    toModel: models.toModel,
    // getWorker,
    // getWorkerProcess,
    getEmitResult,
    // getDTSForCode,
    // getText: () => models.get()?.getValue(),
  };
};
