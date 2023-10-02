import React from "react";
import IDEMenuButton from "./IDEMenuButton";

const options = [{ value: "저장하기", label: "저장하기" }];

export default function IDESaveButton() {
  return <IDEMenuButton placeholder="저장" options={options} />;
}
