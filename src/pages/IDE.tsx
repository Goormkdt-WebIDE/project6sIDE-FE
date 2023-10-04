import React, { useEffect, useState } from "react";
import Editor from "../components/ide/Editor";
import IDEHeader from "../components/ide/IDEHeader";
import TreeView, {
  Code,
  Directory,
  TreeNode,
} from "../components/ide/TreeView";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import useProjects from "../hook/useProjects";
import { NodeApi } from "react-arborist";

export default function IDE() {
  const [project, setProject] = useState<Directory>();
  const [file, setFile] = useState<Code | null>(null);

  const { user } = useAuthContext();

  const { projectname } = useParams();

  const {
    addRootCode,
    addRootDirectory,
    deleteDirectory,
    deleteCode,
    updateDirectory,
    updateCode,
    projectQuery: { data },
  } = useProjects(projectname as string);

  const onClick = (file: Code | null) => {
    setFile(file);
  };

  const onCreate = ({
    parentId,
    index,
    type,
    parentNode,
  }: {
    parentId: string | null;
    index: number;
    type: string;
    parentNode: NodeApi<Code | Directory> | null;
  }) => {
    if (!parentId && type === "internal") {
      addRootDirectory.mutate({
        name: "",
        projectId: project?.id as string,
      });
    }
    if (!parentId && type === "leaf") {
      addRootCode.mutate({
        text: "",
        name: "",
        projectId: project?.id as string,
      });
    }
    return null;
  };

  const onDelete = ({
    ids,
    nodes,
  }: {
    ids: string[];
    nodes: NodeApi<Code | Directory>[];
  }) => {
    deleteDirectory.mutate(ids[0]);
    deleteCode.mutate(ids[0]);
  };

  const onMove = (result) => {
    console.log(result);
  };

  const onRename = ({
    id,
    name,
    node,
  }: {
    id: string;
    name: string;
    node: NodeApi<Code | Directory>;
  }) => {
    console.log(node.data);
    if (node.data.type === "directory") {
      updateDirectory.mutate({
        name,
        directoryId: id,
      });
      return;
    }
    updateCode.mutate({
      name,
      text: (node.data as Code).text,
      codeId: id,
    });
  };

  useEffect(() => {
    if (user && projectname && data) {
      setProject(transformData(data.data));
    }
  }, [user, projectname, data]);

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
