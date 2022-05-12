// import allGuides from 'content/Guide/_index.json';
// import allMeta from 'content/Meta/_index.json';

// import type { Guide, Meta } from 'contentlayer/generated';
import { FileTree } from 'lib/file-tree/file-tree';
import { FileTreeBranch } from 'lib/file-tree/file-tree-branch';

// sidebar_label
// sidebar_hide
// sidebar_position

const sortAs = (k: string) => k.replace('/index.md', '').length;
const fsSort = (array: any[]) => array.sort().sort((a, b) => sortAs(a) - sortAs(b));

// export function buildDocumentTreeWithMeta(metas: Meta[], documents: Guide[]) {
//   const withMetaIntegrated = [allGuides, allMeta].flat().reduce((acc, content) => {
//     const meta: any = {
//       slug: content.slug,
//       position: content.position,
//       sidebar_label: content.title,
//     };
//
//     if (content.type === 'Meta') {
//       const mMeta = { ...meta, _meta: true, isDir: content.isDir ?? false };
//
//       const indexKey = content._raw.sourceFilePath.replace(/_meta_\.md$/, 'index.md');
//
//       if (indexKey in acc) {
//         acc[indexKey].meta = acc[indexKey].meta || {};
//         acc[indexKey].meta = { ...acc[indexKey].meta, ...mMeta };
//       } else {
//         acc[indexKey] = { content: {}, meta: { ...mMeta, _meta: true } };
//       }
//     } else {
//       if (content._raw.sourceFilePath in acc) {
//         acc[content._raw.sourceFilePath].content = content;
//       } else {
//         acc[content._raw.sourceFilePath] = { content, meta };
//       }
//     }
//
//     return acc;
//   }, {});
//
//   const ordered = fsSort(Object.keys(withMetaIntegrated)).reduce((obj, key) => {
//     obj[key] = withMetaIntegrated[key];
//     return obj;
//   }, {});
//
//   return buildTree(ordered);
// }

export function buildTree(fileTree: FileTree): FileTreeBranch {
  const items = {} as FileTreeBranch;

  Object.entries(fileTree).forEach(([k, v]) => {
    const parts = k.split('/');
    const file = parts.pop()!;

    let parent: any;
    let cursor: any = items;
    let parentTreePath = [] as string[];

    while (parts.length) {
      const bit = parts.shift()!;
      parentTreePath.push(bit);

      const parentPath = parentTreePath.join('/');

      if (!cursor[bit]) {
        const item = {
          meta: v.meta,
          fileName: parentPath,
          children: {},
        };

        cursor[bit] = item;
        parent = item;
        cursor = item.children;
      } else {
        parent = cursor[bit];
        cursor = cursor[bit].children;
      }
    }

    const item = {
      name: file!,
      meta: v.meta,
      fileName: k,
    };

    if (!(parent && file === 'index.md')) {
      cursor[file] = item;
    }
  });

  return items;
}
