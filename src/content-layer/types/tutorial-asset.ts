import { defineNestedType } from 'contentlayer/source-files';

export const TutorialAsset = defineNestedType(() => ({
  name: 'TutorialAsset',
  fields: {
    content: { type: 'string' },
    path: { type: 'string', required: true },
    // resolvedContent:  { type: 'string' },
    // resolvedFileName: { type: 'string' },
  },
}));
