import React from "react";
import { NodeApi, TreeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

type Props = {
  node: NodeApi<Code | Directory>;
  tree: TreeApi<Code | Directory>;
};

export default function NodeActions({ node, tree }: Props) {
  return (
    <div className="folderFileActions">
      <button onClick={() => node.edit()} title="Rename...">
        <MdEdit />
      </button>
      <button onClick={() => tree.delete(node.id)} title="Delete">
        <RxCross2 />
      </button>
    </div>
  );
}
