import React from "react";
import IDEMenuBar from "./IDEMenuBar";
import { Link } from "react-router-dom";

type Props = {
  onSaveMenuClick: () => void;
  onAddFileMenuClick: () => void;
  onAddDirectoryMenuClick: () => void;
};

export default function IDEHeader({
  onSaveMenuClick,
  onAddFileMenuClick,
  onAddDirectoryMenuClick,
}: Props) {
  return (
    <header className="flex p-2 items-center">
      <Link to="/">
        <h1 className="text-blue-700 font-bold text-lg md:mr-10">6S IDE</h1>
      </Link>
      <IDEMenuBar
        className="ml-20 md:ml-0"
        onSaveMenuClick={onSaveMenuClick}
        onAddFileMenuClick={onAddFileMenuClick}
        onAddDirectoryMenuClick={onAddDirectoryMenuClick}
      />
    </header>
  );
}
