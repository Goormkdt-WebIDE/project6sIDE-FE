import React from "react";
import { Code, Directories } from "../pages/IDE";
import File from "./File";
import { AiOutlineFolder } from "react-icons/ai";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";

type Props = {
  directory: Directories;
  onClick: (file: Code | null) => void;
  onToggleIsOpened: (path: number[]) => void;
  onSelectFileOrDirectory: (path: number[]) => void;
  path: number[];
};

export default function Directory({
  directory,
  onClick,
  onToggleIsOpened,
  onSelectFileOrDirectory,
  path,
}: Props) {
  return (
    <div className="ml-5">
      <div
        tabIndex={0}
        className="font-bold flex items-center cursor-pointer hover:bg-slate-200 focus:border focus:bg-slate-200"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          onClick(null);
          onToggleIsOpened(path);
          onSelectFileOrDirectory(path);
          (e.target as HTMLDivElement).focus();
        }}
      >
        <AiOutlineFolder />
        <h3 className="whitespace-nowrap text-sm">{directory.name}</h3>
        {directory.isOpened ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
      </div>
      {directory.isOpened &&
        directory.directories?.map((subDirectory, index) => (
          <Directory
            key={subDirectory.id}
            directory={subDirectory}
            onClick={onClick}
            onToggleIsOpened={onToggleIsOpened}
            onSelectFileOrDirectory={onSelectFileOrDirectory}
            path={[...path, index]}
          />
        ))}
      {directory.isOpened &&
        directory.codes?.map((code, index) => (
          <File
            key={code.id}
            file={code}
            onClick={onClick}
            onSelectFileOrDirectory={onSelectFileOrDirectory}
            path={[...path, index]}
          />
        ))}
    </div>
  );
}
