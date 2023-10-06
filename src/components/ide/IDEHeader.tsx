import React from "react";
import IDEMenuBar from "./IDEMenuBar";
import { Link } from "react-router-dom";

type Props = {
  onSaveMenuClick: () => void;
};

export default function IDEHeader({ onSaveMenuClick }: Props) {
  return (
    <header className="flex p-2 items-center">
      <Link to="/">
        <h1 className="text-blue-700 font-bold text-lg mr-10">6S IDE</h1>
      </Link>
      <IDEMenuBar onSaveMenuClick={onSaveMenuClick} />
    </header>
  );
}
