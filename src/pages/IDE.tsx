import React, { useEffect, useState } from "react";
import Editor from "../components/ide/Editor";
import axios from "axios";
import IDEHeader from "../components/ide/IDEHeader";
import TreeView, {
  Code,
  Directory,
  TreeNode,
} from "../components/ide/TreeView";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../common/constant";
import { getProject } from "../service/http-requests/ide-api";

export default function IDE() {
  const [project, setProject] = useState<Directory>();
  const [file, setFile] = useState<Code | null>(null);

  const { user } = useAuthContext();

  const { projectname } = useParams();

  const onClick = (file: Code | null) => {
    setFile(file);
  };

  const onCreate = (result) => {
    console.log(result);
  };

  const onDelete = (result) => {
    console.log(result);
  };

  const onMove = (result) => {
    console.log(result);
  };

  const onRename = (result) => {
    console.log(result);
  };

  useEffect(() => {
    if (user && projectname) {
      getProject({
        email: user.email,
        name: projectname,
      }).then((res) => {
        const project = transformData(res.data);
        setProject(project);
      });
    }
  }, [user, projectname]);

  return (
    <>
      <IDEHeader />
      {project && (
        <div className="flex w-full h-full px-3 pb-10">
          <TreeView
            data={project}
            onClick={onClick}
            onCreate={onCreate}
            onDelete={onDelete}
            onMove={onMove}
            onRename={onRename}
          />
          <Editor file={file} />
        </div>
      )}
    </>
  );
}

function transformData(
  inputData: Directory | Code,
  isDirectory: boolean = true
): TreeNode {
  let children: TreeNode[] = [];
  if (isDirectory) {
    inputData.type = "directory";
    const dirData = inputData as Directory;
    if (dirData.directories && dirData.directories.length > 0) {
      children = children.concat(
        dirData.directories.map((dir) => transformData(dir, true))
      );
    }
    if (dirData.codes && dirData.codes.length > 0) {
      children = children.concat(
        dirData.codes.map((code) => transformData(code, false))
      );
    }
  } else {
    inputData.type = "file";
  }

  return {
    ...inputData,
    children: children.length > 0 ? children : undefined,
  };
}
