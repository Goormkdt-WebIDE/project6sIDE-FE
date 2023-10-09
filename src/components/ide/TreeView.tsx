import React from "react";
import { Tree } from "react-arborist";
import { IdObj } from "react-arborist/dist/types/utils";
import {
  Code,
  Directory,
  onCreateArgs,
  onDeleteArgs,
  onRenameArgs,
} from "../types/TreeView.types";
import Node from "./Node";

const treeClassname = "tree";

type Props = {
  data: Directory;
  onClickFile: (file: Code | null) => void;
  onClickDirectory: (id: string | null) => void;
  onCreate: ({
    parentId,
    index,
    type,
    parentNode,
  }: onCreateArgs) => IdObj | Promise<IdObj | null> | null;
  onDelete: ({ ids, nodes }: onDeleteArgs) => void;
  onRename: ({ id, name, node }: onRenameArgs) => void;
  className?: string;
};

export default function TreeView({
  data,
  onClickFile,
  onClickDirectory,
  onCreate,
  onDelete,
  onRename,
  className,
}: Props) {
  return (
    <div className={`flex flex-col md:basis-1/5 ${className}`}>
      <h2>{data.name}</h2>
      <Tree
        data={data.children}
        onCreate={onCreate}
        onDelete={onDelete}
        onRename={onRename}
        className={treeClassname}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains(treeClassname)) {
            onClickDirectory(null);
          }
        }}
      >
        {(props) => (
          <Node
            {...props}
            node={props.node}
            onClickFile={onClickFile}
            onClickDirectory={onClickDirectory}
          />
        )}
      </Tree>
    </div>
  );
}
