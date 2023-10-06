import React from "react";
import IDEFileButton from "./IDEFileButton";
import IDEEditButton from "./IDEEditButton";
import IDESaveButton from "./IDESaveButton";

type Props = {
  onSaveMenuClick: () => void;
};

export default function IDEMenuBar({ onSaveMenuClick }: Props) {
  return (
    <div className="flex">
      <IDEFileButton />
      <IDEEditButton />
      <IDESaveButton onSaveMenuClick={onSaveMenuClick} />
    </div>
  );
}
