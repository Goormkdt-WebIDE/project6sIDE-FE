import React from "react";
import IDEFileButton from "./IDEFileButton";
import IDESaveButton from "./IDESaveButton";

type Props = {
  onSaveMenuClick: () => void;
  onAddFileMenuClick: () => void;
  onAddDirectoryMenuClick: () => void;
  className?: string;
};

export default function IDEMenuBar({
  onSaveMenuClick,
  onAddFileMenuClick,
  onAddDirectoryMenuClick,
  className,
}: Props) {
  return (
    <div className={`flex ${className}`}>
      <IDEFileButton
        onAddFileMenuClick={onAddFileMenuClick}
        onAddDirectoryMenuClick={onAddDirectoryMenuClick}
      />
      <IDESaveButton onSaveMenuClick={onSaveMenuClick} />
    </div>
  );
}
