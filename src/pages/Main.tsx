import React from "react";
import NewProjectBtn from "../components/NewProjectBtn";

function Main() {

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/background.jpeg')",
      }}
    >
      <div className="text-center items-center w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-blue-500 text-5xl pb-4 mb-2 border-none font-thin">
            6S IDE
          </h1>
          <form
            className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
          >
            <NewProjectBtn text="새 프로젝트 생성"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
