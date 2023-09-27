import React from "react";
import { Code } from "../pages/IDE";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";

type Props = {
  file: Code;
  onClick: (file: Code | null) => void;
  onSelectFileOrDirectory: (path: number[]) => void;
  path: number[];
};

export default function File({
  file,
  onClick,
  onSelectFileOrDirectory,
  path,
}: Props) {
  return (
    <div className="ml-5">
      <div
        tabIndex={0}
        className="flex items-center cursor-pointer hover:bg-slate-200 focus:border focus:bg-slate-200"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          onClick(file);
          (e.target as HTMLDivElement).focus();
          onSelectFileOrDirectory(path);
        }}
      >
        <BsFillFileEarmarkCodeFill />
        <h4 className="text-sm">{file.name}</h4>
      </div>
    </div>
  );
}
