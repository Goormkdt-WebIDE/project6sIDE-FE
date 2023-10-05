import React from "react";
import AceEditor from "react-ace";

import { config } from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { Code } from "./TreeView";

config.set("basePath", "/node_modules/ace-builds/src-min-noconflict");

type Props = {
  file: Code | null;
};

export default function Editor({ file }: Props) {
  return (
    <AceEditor
      mode={file && file.extension ? file.extension : "java"}
      theme="monokai"
      onChange={() => {}}
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
