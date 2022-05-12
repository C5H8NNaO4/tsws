import { ReplTutorial } from 'components/repl/context';

export const solvedAsset = (tutorial: ReplTutorial) =>
  tutorial.assets!.find((t) => t.path.includes('resolved.'))!;

export const visibleAssets = (tutorial: ReplTutorial) =>
  tutorial.assets!.filter((t) => !t.path.includes('resolved.'));

export const hasSolvedFile = (tutorial: ReplTutorial) => !!solvedAsset(tutorial);
