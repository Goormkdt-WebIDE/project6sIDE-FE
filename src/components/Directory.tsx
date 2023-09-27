import React from "react";
import { Code, Directories } from "../pages/IDE";
import File from "./File";
import { AiOutlineFolder } from "react-icons/ai";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";

type Props = {
  directory: Directories;
  onClick: (file: Code | null) => void;
  onToggleIsOpened: (path: number[]) => void;
  path: number[];
};

export default function Directory({
  directory,
  onClick,
  onToggleIsOpened,
  path,
}: Props) {
  return (
    <div className="ml-5">
      <div
        className="font-bold flex items-center cursor-pointer"
        onClick={() => {
          onClick(null);
          onToggleIsOpened(path);
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
            path={[...path, index]}
          />
        ))}
      {directory.isOpened &&
        directory.codes?.map((code) => (
          <File key={code.id} file={code} onClick={onClick} />
        ))}
    </div>
  );
}
