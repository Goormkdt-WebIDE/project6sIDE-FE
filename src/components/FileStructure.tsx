import React from "react";
import { Code, Project } from "../pages/IDE";
import Directory from "./Directory";

type Props = {
  project: Project;
  onClick: (file: Code | null) => void;
  onToggleIsOpened: (path: number[]) => void;
};

export default function FileStructure({
  project,
  onClick,
  onToggleIsOpened,
}: Props) {
  return (
    <nav className="grow overflow-x-scroll overflow-y-scroll bg-white">
      <h2>{project.name}</h2>
      {project.directories?.map((d, index) => (
        <Directory
          key={d.id}
          directory={d}
          onClick={onClick}
          onToggleIsOpened={onToggleIsOpened}
          path={[index]}
        />
      ))}
    </nav>
  );
}
