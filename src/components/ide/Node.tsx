import { NodeRendererProps } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import NodeToggleArrow from "./NodeToggleArrow";
import NodeFileIcon from "./NodeFileIcon";
import NodeName from "./NodeName";
import NodeActions from "./NodeActions";

type AdditionalNodeProps = {
  onClickFile: (file: Code | null) => void;
  onClickDirectory: (id: string | null) => void;
};

export default function Node({
  node,
  tree,
  style,
  dragHandle,
  onClickFile,
  onClickDirectory,
}: NodeRendererProps<Code | Directory> & AdditionalNodeProps) {
  const handleClick = () => {
    node.data.type === "directory" && node.toggle();
    if (node.data.type === "file") {
      onClickFile(node.data as Code);
      onClickDirectory(null);
    }
    if (node.data.type === "directory") {
      onClickDirectory(node.data.id);
    }
  };

  return (
    <div
      tabIndex={0}
      style={style}
      ref={dragHandle}
      onClick={handleClick}
      className={`cursor-pointer hover:bg-slate-200 ${
        node.state.isSelected
          ? "border border-blue-600 bg-slate-100 font-bold"
          : ""
      }`}
    >
      <div className="flex items-center">
        <NodeToggleArrow node={node} />
        <NodeFileIcon node={node} />
        <NodeName node={node} />
        <NodeActions node={node} tree={tree} />
      </div>
    </div>
  );
}
