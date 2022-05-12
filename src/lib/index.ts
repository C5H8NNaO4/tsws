import type { DocumentTypes } from 'contentlayer/generated';

export { buildTree } from 'lib/file-tree/build-file-tree';
// export { FileTreeBranch } from 'lib/file-tree/file-tree-branch';

export const indexBy = <T, U extends keyof T>(arr: T[], key: U): ((_) => number) => {
  return (obj: T) => {
    const res = arr.find((o) => o[key] === obj[key])!;
    return arr.indexOf(res);
  };
};

export const tocAndBoy = (doc: DocumentTypes) => {
  const del = '</nav>';
  const [toc, body] = doc.body.html?.split(del);

  return {
    toc: `${toc}${del}`,
    body,
  };
};
