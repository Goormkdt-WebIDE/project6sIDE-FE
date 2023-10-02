import React from "react";
import { Tree, NodeRendererProps } from "react-arborist";
import { AiOutlineFolder } from "react-icons/ai";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export type Code = {
  id: string;
  name: string;
  text: string;
  type?: string;
  children?: TreeNode[];
};

export type Directory = {
  id: string;
  name: string;
  directories?: Directory[];
  codes?: Code[];
  type?: string;
  children?: TreeNode[];
};

type TreeNode = Directory | Code;

type Props = {
  data: Directory;
  onClick: (file: Code | null) => void;
};

export default function TreeView({ data, onClick }: Props) {
  const transformedData = transformData(data);
  console.log(transformedData);
  return (
    <div className="flex flex-col">
      <h2>{transformedData.name}</h2>
      <Tree initialData={transformedData.children}>
        {(props) => <Node {...props} node={props.node} onClick={onClick} />}
      </Tree>
    </div>
  );
}

type AdditionalNodeProps = {
  onClick: (file: Code | null) => void;
};

function Node({
  node,
  tree,
  style,
  dragHandle,
  onClick,
}: NodeRendererProps<Code | Directory> & AdditionalNodeProps) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div
      tabIndex={0}
      style={style}
      ref={dragHandle}
      onClick={() => {
        node.isInternal && node.toggle();
        if (node.data.type === "file") {
          onClick(node.data as Code);
        }
      }}
      className={`cursor-pointer hover:bg-slate-200 ${
        node.state.isSelected
          ? "border border-blue-600 bg-slate-100 font-bold"
          : ""
      }`}
    >
      <div className="flex items-center">
        {node.isLeaf ? <BsFillFileEarmarkCodeFill /> : <AiOutlineFolder />}{" "}
        {node.isEditing ? (
          <input
            type="text"
            defaultValue={node.data.name}
            onFocus={(e) => e.currentTarget.select()}
            onBlur={() => node.reset()}
            onKeyDown={(e) => {
              if (e.key === "Escape") node.reset();
              if (e.key === "Enter") node.submit(e.currentTarget.value);
            }}
            autoFocus
          />
        ) : (
          <h3>{node.data.name}</h3>
        )}
        {!node.isLeaf && node.isClosed ? (
          <BiSolidRightArrow />
        ) : !node.isLeaf && !node.isClosed ? (
          <BiSolidDownArrow />
        ) : (
          ""
        )}
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={() => tree.delete(node.id)} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
}

function transformData(
  inputData: Directory | Code,
  isDirectory: boolean = true
): TreeNode {
  let children: TreeNode[] = [];
  if (isDirectory) {
    inputData.type = "directory";
    const dirData = inputData as Directory;
    if (dirData.directories && dirData.directories.length > 0) {
      children = children.concat(
        dirData.directories.map((dir) => transformData(dir, true))
      );
    }
    if (dirData.codes && dirData.codes.length > 0) {
      children = children.concat(
        dirData.codes.map((code) => transformData(code, false))
      );
    }
  } else {
    inputData.type = "file";
  }

  return {
    ...inputData,
    children: children.length > 0 ? children : undefined,
  };
}
