import React from "react";
import IDEMenuButton from "./IDEMenuButton";

const options = [{ value: "저장하기", label: "저장하기" }];

type Props = {
  onSaveMenuClick: () => void;
};

export default function IDESaveButton({ onSaveMenuClick }: Props) {
  return (
    <IDEMenuButton
      placeholder="저장"
      options={options}
      onClick={onSaveMenuClick}
    />
  );
}
