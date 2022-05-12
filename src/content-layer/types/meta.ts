import { defineDocumentType } from 'contentlayer/source-files';

export const Meta = defineDocumentType(() => ({
  name: 'Meta',
  filePathPattern: `guide/**/_meta_.md`,
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: false, default: '#' },
    position: { type: 'number', default: 1 },
    isDir: { type: 'boolean', default: false, required: false },
    showInNav: { type: 'boolean', default: true, required: false },
  },
}));
