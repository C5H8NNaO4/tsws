export interface FileTreeBranch {
  meta: {
    [key: string]: any;

    position: number;
    sidebar_label?: string;
    isDir?: boolean;
  };
  content?: string;
  resolved?: string;
  fileName: string;
  children: {
    [key: string]: FileTreeBranch;
  };
}
