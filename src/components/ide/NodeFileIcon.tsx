import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { AiOutlineFolder } from "react-icons/ai";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeFileIcon({ node }: Props) {
  return (
    <>
      {node.data.type === "file" ? (
        <BsFillFileEarmarkCodeFill />
      ) : (
        <AiOutlineFolder />
      )}{" "}
    </>
  );
}
