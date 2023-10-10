import React from "react";
import { NodeApi, TreeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useTheme } from "../../context/isDarkModeContext";

type Props = {
  node: NodeApi<Code | Directory>;
  tree: TreeApi<Code | Directory>;
};

export default function NodeActions({ node, tree }: Props) {
  const { theme } = useTheme();
  return (
    <div
      className={`mr-3 invisible group-hover:visible ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <button onClick={() => node.edit()} title="Rename...">
        <MdEdit />
      </button>
      <button onClick={() => tree.delete(node.id)} title="Delete">
        <RxCross2 />
      </button>
    </div>
  );
}
