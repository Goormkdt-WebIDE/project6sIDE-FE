import React, { useEffect, useRef, useState } from "react";
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
import ReactAce from "react-ace/lib/ace";

export default function IDE() {
  const [project, setProject] = useState<Directory>();
  const [file, setFile] = useState<Code | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);

  const { user } = useAuthContext();

  const { projectname } = useParams();

  const {
    addRootCode,
    addRootDirectory,
    addSubDirectory,
    addCodeToSubDirectory,
    deleteDirectory,
    deleteCode,
    updateDirectory,
    updateCode,
    projectQuery: { data },
  } = useProjects(projectname as string);

  const onClickFile = (file: Code | null) => {
    setFile(file);
  };

  const onClickDirectory = (id: string | null) => {
    setDirectory(id);
  };

  const onCreate = ({ type }: { type: string }) => {
    if (directory && type === "internal") {
      addSubDirectory.mutate({
        name: "",
        projectId: project?.id as string,
        directoryId: directory,
      });
    }

    if (directory && type === "leaf") {
      addCodeToSubDirectory.mutate({
        name: "",
        text: "",
        projectId: project?.id as string,
        directoryId: directory,
      });
    }

    if (!directory && type === "internal") {
      addRootDirectory.mutate({
        name: "",
        projectId: project?.id as string,
      });
    }

    if (!directory && type === "leaf") {
      addRootCode.mutate({
        text: "",
        name: "",
        projectId: project?.id as string,
      });
    }
    return null;
  };

  const onDelete = ({ ids }: { ids: string[] }) => {
    ids.forEach((id) => {
      deleteDirectory.mutate({
        projectId: project?.id as string,
        directoryId: id,
      });
      deleteCode.mutate({
        projectId: project?.id as string,
        codeId: id,
      });
    });
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
        projectId: project?.id as string,
        directoryId: id,
      });
      return;
    }
    updateCode.mutate({
      name,
      text: (node.data as Code).text,
      projectId: project?.id as string,
      codeId: id,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggle = (_: string) => {};

  const editorRef = useRef<ReactAce | null>(null);

  const onSaveMenuClick = () => {
    if (editorRef.current && file) {
      const text = editorRef.current.editor.getValue();
      updateCode.mutate({
        name: file.name,
        text,
        projectId: project?.id as string,
        codeId: file.id,
      });
    }
  };

  useEffect(() => {
    if (user && projectname && data) {
      const project = _.cloneDeep(data.data) as Code | Directory;
      setProject(transformData(project));
    }
  }, [user, projectname, data]);

  return (
    <>
      <IDEHeader onSaveMenuClick={onSaveMenuClick} />
      {project && (
        <div className="flex w-full h-full px-3 pb-10">
          <TreeView
            data={project}
            onClickFile={onClickFile}
            onClickDirectory={onClickDirectory}
            onCreate={onCreate}
            onDelete={onDelete}
            onMove={onMove}
            onRename={onRename}
            onToggle={onToggle}
          />
          <Editor file={file} editorRef={editorRef} />
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
    if (
      dirData.directories &&
      dirData.directories.length > 0 &&
      dirData.directories.filter((c) => c !== null).length > 0
    ) {
      children = children.concat(
        dirData.directories.map((dir) => transformData(dir, true))
      );
    }
    if (
      dirData.codes &&
      dirData.codes.length > 0 &&
      dirData.codes.filter((c) => c !== null).length > 0
    ) {
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
