import React from "react";
import IDEMenuButton from "./IDEMenuButton";

const addFileValue = "새 파일";
const addFolderValue = "새 폴더";

const options = [
  {
    value: addFileValue,
    label: addFileValue,
  },
  {
    value: addFolderValue,
    label: addFolderValue,
  },
];

type Props = {
  onAddFileMenuClick: () => void;
  onAddDirectoryMenuClick: () => void;
};

export default function IDEFileButton({
  onAddFileMenuClick,
  onAddDirectoryMenuClick,
}: Props) {
  return (
    <IDEMenuButton
      placeholder="파일"
      className="mr-5"
      options={options}
      onClick={(v) => {
        if (v) {
          v.value === addFileValue
            ? onAddFileMenuClick()
            : onAddDirectoryMenuClick();
        }
      }}
    />
  );
}
