import React from "react";
import IDEMenuButton from "./IDEMenuButton";

const options = [
  {
    value: "편집하기",
    label: "편집하기",
  },
];

export default function IDEEditButton() {
  return (
    <IDEMenuButton placeholder="편집" className="mr-5" options={options} />
  );
}
