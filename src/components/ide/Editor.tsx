import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import * as ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import modelist from "ace-builds/src-noconflict/ext-modelist";
import { Code } from "./TreeView";

ace.config.set("basePath", "/node_modules/ace-builds/src-min-noconflict");

type Props = {
  file: Code | null;
};

export default function Editor({ file }: Props) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(file && file.text ? file.text : "");
  }, [file]);

  return (
    <AceEditor
      mode={file ? getModeByFileExtension(file.name) : "java"}
      theme="monokai"
      onChange={(value) => {
        setValue(value);
      }}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      value={value}
      style={{
        flexBasis: "80%",
        height: "100%",
      }}
    />
  );
}

function getModeByFileExtension(path: string) {
  return modelist.getModeForPath(path).name;
}
