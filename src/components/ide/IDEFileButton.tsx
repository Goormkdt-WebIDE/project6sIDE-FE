import React from "react";
import IDEMenuButton from "./IDEMenuButton";

const options = [
  {
    value: "새 파일",
    label: "새 파일",
  },
  {
    value: "새 폴더",
    label: "새 폴더",
  },
  {
    value: "이름 수정",
    label: "이름 수정",
  },
];

export default function IDEFileButton() {
  return (
    <IDEMenuButton placeholder="파일" className="mr-5" options={options} />
  );
}
