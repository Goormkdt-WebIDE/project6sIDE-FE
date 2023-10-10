import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { AiOutlineFolder } from "react-icons/ai";
import { useTheme } from "../../context/isDarkModeContext";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeFileIcon({ node }: Props) {
  const { theme } = useTheme();
  return (
    <div className={`mr-1 ${theme === "dark" ? "text-white" : ""} `}>
      {node.data.type === "file" ? (
        <BsFillFileEarmarkCodeFill />
      ) : (
        <AiOutlineFolder />
      )}{" "}
    </div>
  );
}
