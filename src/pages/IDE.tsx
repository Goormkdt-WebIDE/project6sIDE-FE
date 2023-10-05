import React, { useEffect, useState } from "react";
import Editor from "../components/ide/Editor";
import IDEHeader from "../components/ide/IDEHeader";
import _ from "lodash";
import TreeView, {
  Code,
  Directory,
  TreeNode,
} from "../components/ide/TreeView";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import useProjects from "../hook/useProjects";
import { NodeApi } from "react-arborist";
import { produce } from "immer";

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

    type,
  }: {
    parentId: string | null;

    type: string;
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

  const onDelete = ({ ids }: { ids: string[] }) => {
    deleteDirectory.mutate(ids[0]);
    deleteCode.mutate(ids[0]);
  };

  const onMove = ({
    dragIds,
    dragNodes,
    parentId,
    parentNode,
    index,
  }: {
    dragIds: string[];
    dragNodes: NodeApi<Directory | Code>[];
    parentId: string | null;
    parentNode: NodeApi<Directory | Code> | null;
    index: number;
  }) => {
    console.log(dragIds, dragNodes, parentId, parentNode, index);
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

  const onToggle = (id: string) => {
    const newStates = produce(project, (draft) => {
      if (draft && draft.children) {
        const item = draft.children.find((c) => c.id === id) as Directory;
        if (item) {
          item.isClosed = !item.isClosed;
        }
      }
    });
    setProject(newStates);
  };

  useEffect(() => {
    if (user && projectname && data) {
      const project = _.cloneDeep(data.data) as Code | Directory;
      setProject(transformData(project));
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
            onToggle={onToggle}
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
    (inputData as Directory).isClosed = true;
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
