import React from "react";
import { NodeApi } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useTheme } from "../../context/isDarkModeContext";

type Props = {
  node: NodeApi<Code | Directory>;
};

export default function NodeToggleArrow({ node }: Props) {
  const { theme } = useTheme();
  return (
    <div className={`mr-1 ${theme === "dark" ? "text-white" : ""} `}>
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
