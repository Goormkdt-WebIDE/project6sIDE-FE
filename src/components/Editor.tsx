import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Code } from "../pages/IDE";

type Props = {
  file: Code | null;
};

export default function Editor({ file }: Props) {
  return (
    <AceEditor
      mode="java"
      theme="github"
      onChange={() => console.log("hello")}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      value={file?.text}
      style={{
        flexBasis: "80%",
        height: "100%",
      }}
    />
  );
}
