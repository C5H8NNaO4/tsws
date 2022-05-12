import { buildTree } from 'lib/file-tree/build-file-tree';
import { FileTree } from 'lib/file-tree/file-tree';
import { FileTreeBranch } from 'lib/file-tree/file-tree-branch';
import React, { useCallback, useMemo } from 'react';
import { DirectoryIcon, FileIcon } from './icons';

const FileTreeBranchLabel = ({
  selectable,
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  selectable: boolean;
  children: any;
  onClick: any;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'block',
        cursor: selectable ? 'pointer' : 'default',
        color: selected ? 'white' : 'black',
        height: '30px',
        lineHeight: '30px',
      }}
    >
      {children}
    </div>
  );
};

function FileTreeViewBranch({
  branch,
  selectedFilename,
  onSelectFilename,
  modifiedFilenames,
  revertFile,
}: {
  branch: FileTreeBranch;
  selectedFilename: string;
  onSelectFilename: (filename: string) => void;
  modifiedFilenames: Record<string, true>;
  revertFile: (filename: string) => void;
}) {
  const onClick = useCallback(() => {
    onSelectFilename(branch.fileName);
  }, [branch, onSelectFilename]);

  const selected = selectedFilename === branch.fileName;
  const isDirectory = Object.keys(branch.children).length > 0;
  const revert = useCallback(() => revertFile(branch.fileName), [branch, revertFile]);
  return (
    <div>
      <FileTreeBranchLabel
        onClick={onClick}
        selectable={!isDirectory}
        selected={selected}
      >
        <div>
          {isDirectory ? (
            <DirectoryIcon color="gray" />
          ) : (
            <FileIcon color={selected ? 'rgba(255,255,255,0.75)' : 'gray'} />
          )}{' '}
          {branch.meta.sidebar_label}
          <div className="action">
            {modifiedFilenames[branch.fileName] &&
              (selected ? (
                <a className="revert" onClick={revert}>
                  revert
                </a>
              ) : (
                '*'
              ))}
          </div>
        </div>
      </FileTreeBranchLabel>
      {isDirectory && (
        <div className="branch">
          {Object.values(branch.children).map((subBranch) => (
            <FileTreeViewBranch
              key={subBranch.fileName}
              branch={subBranch}
              selectedFilename={selectedFilename}
              onSelectFilename={onSelectFilename}
              modifiedFilenames={modifiedFilenames}
              revertFile={revertFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTreeView({
  fileTree,
  selectedFilename,
  onSelectFilename,
  modifiedFilenames,
  revertFile,
}: {
  fileTree: FileTree;
  selectedFilename: string;
  onSelectFilename: (filename: string) => void;
  modifiedFilenames: Record<string, true>;
  revertFile: (filename: string) => void;
}) {
  const treeItems = useMemo(() => buildTree(fileTree), [fileTree]);
  return (
    <div className="wrapper">
      {[treeItems].map((branch) => (
        <FileTreeViewBranch
          key={branch.fileName}
          branch={branch}
          selectedFilename={selectedFilename}
          onSelectFilename={onSelectFilename}
          modifiedFilenames={modifiedFilenames}
          revertFile={revertFile}
        />
      ))}
    </div>
  );
}
