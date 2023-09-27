import React from "react";
import { Code } from "../pages/IDE";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";

type Props = {
  file: Code;
  onClick: (file: Code | null) => void;
};

export default function File({ file, onClick }: Props) {
  return (
    <div className="ml-5">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => onClick(file)}
      >
        <BsFillFileEarmarkCodeFill />
        <h4 className="text-sm">{file.name}</h4>
      </div>
    </div>
  );
}
