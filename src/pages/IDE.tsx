import React, { useEffect, useRef, useState } from "react";
import Editor from "../components/ide/Editor";
import IDEHeader from "../components/ide/IDEHeader";
import _ from "lodash";
import TreeView from "../components/ide/TreeView";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import useProjects from "../hook/useProjects";
import { NodeApi } from "react-arborist";
import Chatting from "../components/chatting/Chatting";
import ReactAce from "react-ace/lib/ace";
import { slide as Menu } from "react-burger-menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Code, Directory, TreeNode } from "../components/types/TreeView.types";
import "../components/ide/Menu.css";
import "swiper/css";
import "swiper/css/pagination";

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

  const editorRef = useRef<ReactAce | null>(null);
  const projectRef = useRef(project);

  const onSave = (file: Code) => {
    if (editorRef.current && file && (project || projectRef.current)) {
      const text = file.text || editorRef.current.editor.getValue();
      updateCode.mutate({
        name: file.name,
        text,
        projectId: (project?.id || projectRef.current?.id) as string,
        codeId: file.id,
      });
    }
  };

  const onSaveMenuClick = () => {
    if (file) {
      onSave(file);
    }
  };

  const onAddFileMenuClick = () => {
    if (directory) {
      addCodeToSubDirectory.mutate({
        name: "",
        text: "",
        projectId: project?.id as string,
        directoryId: directory,
      });
    } else {
      addRootCode.mutate({
        text: "",
        name: "",
        projectId: project?.id as string,
      });
    }
  };

  const onAddDirectoryMenuClick = () => {
    if (directory) {
      addSubDirectory.mutate({
        name: "",
        projectId: project?.id as string,
        directoryId: directory,
      });
    } else {
      addRootDirectory.mutate({
        name: "",
        projectId: project?.id as string,
      });
    }
  };

  useEffect(() => {
    if (user && projectname && data) {
      const project = _.cloneDeep(data.data) as Code | Directory;
      setProject(transformData(project));
    }
  }, [user, projectname, data]);

  useEffect(() => {
    projectRef.current = project;
  }, [project]);

  return (
    <>
      <IDEHeader
        onSaveMenuClick={onSaveMenuClick}
        onAddFileMenuClick={onAddFileMenuClick}
        onAddDirectoryMenuClick={onAddDirectoryMenuClick}
      />
      <div className="flex w-full h-full px-3 pb-10">
        {project && (
          <>
            <Menu
              burgerButtonClassName="-translate-y-6 translate-x-12 z-10  md:hidden"
              className="block md:hidden"
            >
              <TreeView
                data={project}
                onClickFile={onClickFile}
                onClickDirectory={onClickDirectory}
                onCreate={onCreate}
                onDelete={onDelete}
                onRename={onRename}
              />
            </Menu>
            <TreeView
              data={project}
              onClickFile={onClickFile}
              onClickDirectory={onClickDirectory}
              onCreate={onCreate}
              onDelete={onDelete}
              onRename={onRename}
              className="hidden md:flex"
            />
          </>
        )}
        <Swiper
          className="mySwiper md:hidden"
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          allowTouchMove={false}
          allowSlideNext={true}
          allowSlidePrev={true}
        >
          <SwiperSlide>
            <Editor file={file} editorRef={editorRef} onSave={onSave} />
          </SwiperSlide>
          <SwiperSlide>
            <Chatting />
          </SwiperSlide>
        </Swiper>
        <div className="hidden md:flex md:basis-4/5">
          <Editor file={file} editorRef={editorRef} onSave={onSave} />
          <Chatting />
        </div>
      </div>
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
