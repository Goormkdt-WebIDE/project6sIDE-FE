import React from "react";
import IDEFileButton from "./IDEFileButton";
import IDESaveButton from "./IDESaveButton";

type Props = {
  onSaveMenuClick: () => void;
  onAddFileMenuClick: () => void;
  onAddDirectoryMenuClick: () => void;
};

export default function IDEMenuBar({
  onSaveMenuClick,
  onAddFileMenuClick,
  onAddDirectoryMenuClick,
}: Props) {
  return (
    <div className="flex">
      <IDEFileButton
        onAddFileMenuClick={onAddFileMenuClick}
        onAddDirectoryMenuClick={onAddDirectoryMenuClick}
      />
      <IDESaveButton onSaveMenuClick={onSaveMenuClick} />
    </div>
  );
}
