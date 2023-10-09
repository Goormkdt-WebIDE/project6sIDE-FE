import React from "react";
import NewProject from "../components/project/NewProject";
import MyProjects from "../components/project/MyProjects";

function Main() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center">
      <div className="text-center items-center w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-blue-500 text-5xl pb-4 mb-2 border-none font-thin">
            6S IDE
          </h1>
          <div className="flex items-center justify-center w-full">
            <NewProject />
            <MyProjects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
