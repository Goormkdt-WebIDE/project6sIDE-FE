import React from "react";

export default function IDEHeader() {
  return (
    <header className="flex p-2 items-center">
      <h1 className="text-blue-700 font-bold text-lg mr-10">6S IDE</h1>
      <div>
        <button className="mr-3">파일</button>
        <button className="mr-3">편집</button>
        <button>저장</button>
      </div>
    </header>
  );
}
