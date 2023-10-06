import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeToggleArrow({ node }: Props) {
  return (
    <div className="mr-1">
      {node.data.type !== "file" && node.isClosed ? (
        <MdOutlineKeyboardArrowRight />
      ) : node.data.type !== "file" && !node.isClosed ? (
        <MdOutlineKeyboardArrowDown />
      ) : (
        ""
      )}
    </div>
  );
}
