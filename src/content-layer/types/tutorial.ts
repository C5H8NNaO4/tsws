import { defineDocumentType } from 'contentlayer/source-files';
import { buildUrl } from '../build-url';
import { buildFileSet } from './build-file-set';
import { TutorialAsset } from './tutorial-asset';

export const Tutorial = defineDocumentType(() => ({
  name: 'Tutorial',
  filePathPattern: `tutorial/**/*.md`,
  fields: {
    chapter: { type: 'string', required: true },
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    hasCode: { type: 'boolean', required: false },
    sauce: { type: 'string', required: false },
    position: { type: 'number', required: true },
    assets: {
      type: 'list',
      required: false,
      of: TutorialAsset,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (tut) => buildUrl('tutorial', tut),
    },

    quiz: {
      type: 'string',
      resolve: (tut) => extractQuiz(tut),
    },
    // tutorial contents
    assets: {
      type: 'nested',
      of: TutorialAsset,
      resolve: (tut) => buildFileSet(tut),
    },
  },
}));

const startToken = '```quiz\n';

function extractQuiz(tut: any) {
  const raw = tut.body.raw as string;
  if (!raw.includes(startToken)) return;

  const start = raw.indexOf(startToken);
  const quizStart = start + startToken.length;
  const end = raw.indexOf('```', quizStart);

  return raw.substring(quizStart, end);
}
