import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeToggleArrow({ node }: Props) {
  return (
    <>
      {node.data.type !== "file" && node.isClosed ? (
        <BiSolidRightArrow />
      ) : node.data.type !== "file" && !node.isClosed ? (
        <BiSolidDownArrow />
      ) : (
        ""
      )}
    </>
  );
}
