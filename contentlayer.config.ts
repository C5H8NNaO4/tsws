import { makeSource } from 'contentlayer/source-files';
import remarkRehype from 'remark-rehype';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';

import rehypeShiki from '@stefanprobst/rehype-shiki';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import rehypeFigure from 'rehype-figure';

import * as path from 'path';
import * as shiki from 'shiki';
import * as Content from './src/content-layer/types';

import { styledAdmonition } from './src/content-layer/styled-admonition';
import { remarkRemoveQuiz } from './src/content-layer/remark-remove-quiz';

const tocSettings = {
  position: 'afterbegin',
  headings: 'h2 h3 h4'.split(' '),
};

const shikiPath = (dir: string) => path.join(process.cwd(), 'public', 'shiki', dir, path.sep);

export default makeSource(async () => {
  const highlighter = await shiki.getHighlighter({
    paths: {
      themes: shikiPath('themes'),
      languages: shikiPath('languages'),
    },
    langs: ['css', 'html', 'javascript', 'json', 'sh', 'typescript', 'tsx', 'vue'],
    theme: 'github-light',
  });

  return {
    contentDirPath: 'content',

    documentTypes: Object.values(Content.Documents),
    nestedTypes: Object.values(Content.NestedTypes),

    markdown: {
      remarkPlugins: [remarkRemoveQuiz, remarkGfm, remarkDirective, styledAdmonition],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        [remarkRehype, { allowDangerousHtml: true }],
        rehypeFigure,
        rehypeRaw,
        rehypeSlug,

        [rehypeToc, tocSettings],
        [
          rehypeAutolinkHeadings,
          {
            content: {
              type: 'element',
              tagName: 'span',
              properties: { className: ['icon', 'icon-link'] },
              children: [
                {
                  type: 'text',
                  value: '#',
                },
              ],
            },
            behavior: 'prepend',
          },
        ],
      ],
    },
  };
});
