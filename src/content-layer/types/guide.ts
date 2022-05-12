import { defineDocumentType } from 'contentlayer/source-files';
import { buildUrl } from '../build-url';

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: `guide/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    sauce: { type: 'string', required: false },
    position: { type: 'number', default: 1 },
    isDir: { type: 'boolean', default: false, required: false },
    showInNav: { type: 'boolean', default: true, required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (guide) => buildUrl('guide', guide),
    },
  },
}));
