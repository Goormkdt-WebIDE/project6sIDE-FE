import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";

import * as ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import modelist from "ace-builds/src-noconflict/ext-modelist";
import ReactAce from "react-ace/lib/ace";
import { Code } from "../types/TreeView.types";

ace.config.set("basePath", "/node_modules/ace-builds/src-min-noconflict");

type Props = {
  file: Code | null;
  editorRef: React.MutableRefObject<ReactAce | null>;
  onSave: (file: Code) => void;
};

export default function Editor({ file, editorRef, onSave }: Props) {
  const [value, setValue] = useState<string>("");
  const fileRef = useRef(file);

  useEffect(() => {
    setValue(file && file.text ? file.text : "");
    fileRef.current = file;
  }, [file]);

  return (
    <AceEditor
      ref={editorRef}
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
      commands={[
        {
          name: "saveFile",
          bindKey: { win: "Ctrl-S", mac: "Command-S" },
          exec: () => {
            if (fileRef.current) {
              onSave(fileRef.current);
            }
          },
        },
      ]}
    />
  );
}

function getModeByFileExtension(path: string) {
  return modelist.getModeForPath(path).name;
}
