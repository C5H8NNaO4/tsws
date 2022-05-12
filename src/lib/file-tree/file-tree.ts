import { FileTreeBranch } from 'lib/file-tree/file-tree-branch';

export interface FileTree {
  [fileName: string]: FileTreeBranch;
}
