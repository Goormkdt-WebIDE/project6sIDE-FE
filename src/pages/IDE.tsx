import React, { useEffect, useState } from "react";
import Editor from "../components/ide/Editor";
import axios from "axios";
import IDEHeader from "../components/ide/IDEHeader";
import TreeView, { Code, Directory } from "../components/ide/TreeView";

export default function IDE() {
  const [project, setProject] = useState<Directory>();
  const [file, setFile] = useState<Code | null>(null);

  const onClick = (file: Code | null) => {
    setFile(file);
  };

  useEffect(() => {
    axios.get("/data/project.json").then((res) => {
      const project = res.data;
      setProject(project);
    });
  }, []);

  return (
    <>
      <IDEHeader />
      {project && (
        <div className="flex w-full h-full px-3 pb-10">
          <TreeView data={project} onClick={onClick} />
          <Editor file={file} />
        </div>
      )}
    </>
  );
}
