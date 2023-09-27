import React from "react";
import IDEMenuBar from "./IDEMenuBar";

// const buttonStyle = "hover:bg-slate-200 p-1";

export default function IDEHeader() {
  return (
    <header className="flex p-2 items-center">
      <h1 className="text-blue-700 font-bold text-lg mr-10">6S IDE</h1>
      <IDEMenuBar />
    </header>
  );
}
