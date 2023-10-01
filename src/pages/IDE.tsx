import React, { useEffect, useState } from "react";
import FileStructure from "../components/FileStructure";
import Editor from "../components/Editor";
import axios from "axios";
import { Draft, produce } from "immer";
import IDEHeader from "../components/IDEHeader";
import TreeView from "../components/TreeView";

export type Code = {
  id: string;
  name: string;
  text: string;
};
export type Directories = {
  id: string;
  name: string;
  directories?: Directories[];
  codes?: Code[];
  isOpened: boolean;
};

export type Project = {
  id: string;
  name: string;
  email: string;
  directories?: Directories[];
  codes?: Code[];
};

export default function IDE() {
  const [project, setProject] = useState<Project>();
  const [file, setFile] = useState<Code | null>(null);

  const onClick = (file: Code | null) => {
    setFile(file);
  };

  const toggleIsOpened = (path: number[]) => {
    setProject(
      produce(project, (draft: Draft<Project>) => {
        if (!draft.directories) return;
        let currentDirectory: Draft<Directories> | undefined =
          draft.directories[path[0]];

        for (let i = 1; i < path.length; i++) {
          if (!currentDirectory || !currentDirectory.directories) break;
          currentDirectory = currentDirectory.directories[path[i]];
        }

        if (currentDirectory)
          currentDirectory.isOpened = !currentDirectory.isOpened;
      })
    );
  };

  const onSelectFileOrDirectory = (path: number[]) => {
    console.log(path);
  };

  useEffect(() => {
    axios.get("/data/project.json").then((res) => {
      const project = res.data;
      addIsOpenedProperty(project.directories);
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

function addIsOpenedProperty(directories: Directories[]) {
  for (const directory of directories) {
    directory.isOpened = false;
    if (directory.directories && directory.directories.length > 0) {
      addIsOpenedProperty(directory.directories);
    }
  }
}
