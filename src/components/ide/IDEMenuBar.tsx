import React from "react";
import IDEFileButton from "./IDEFileButton";
import IDEEditButton from "./IDEEditButton";
import IDESaveButton from "./IDESaveButton";

export default function IDEMenuBar() {
  return (
    <div className="flex">
      <IDEFileButton />
      <IDEEditButton />
      <IDESaveButton />
    </div>
  );
}
