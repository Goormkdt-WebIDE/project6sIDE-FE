import { NodeRendererProps } from "react-arborist";
import { Code, Directory } from "../types/TreeView.types";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { AiOutlineFolder } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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
  return (
    <div
      tabIndex={0}
      style={style}
      ref={dragHandle}
      onClick={() => {
        node.data.type === "directory" && node.toggle();
        if (node.data.type === "file") {
          onClickFile(node.data as Code);
          onClickDirectory(null);
        }
        if (node.data.type === "directory") {
          onClickDirectory(node.data.id);
        }
      }}
      className={`cursor-pointer hover:bg-slate-200 ${
        node.state.isSelected
          ? "border border-blue-600 bg-slate-100 font-bold"
          : ""
      }`}
    >
      <div className="flex items-center">
        {node.data.type === "file" ? (
          <BsFillFileEarmarkCodeFill />
        ) : (
          <AiOutlineFolder />
        )}{" "}
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
        {node.data.type !== "file" && node.isClosed ? (
          <BiSolidRightArrow />
        ) : node.data.type !== "file" && !node.isClosed ? (
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
