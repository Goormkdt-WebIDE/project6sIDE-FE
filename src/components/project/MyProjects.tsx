import React from "react";
import useAllProjects from "../../hook/useAllProjects";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

type Project = {
  id: string;
  name: string;
  email: string;
};

export default function MyProjects() {
  const {
    allProjectQuery: { data: projects },
    deleteProject,
  } = useAllProjects();

  const handleDelete = (projectId: string) => {
    deleteProject.mutate(projectId);
  };

  return (
    <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90">
      <h2 className="text-xl text-blue-400 mb-2">내 모든 프로젝트</h2>
      <ul className="overflow-scroll h-56">
        {projects &&
          projects.data.map((d: Project) => (
            <li
              key={d.id}
              className="relative rounded-lg shadow-lg bg-blue-400 hover:bg-blue-500 mb-2"
            >
              <Link
                className="w-full p-8 flex items-center justify-center text-white text-xl"
                to={`/workspace/${d.name}`}
              >
                {d.name}
              </Link>
              <button
                className="absolute top-[20%] right-[5%] text-white hover:text-black"
                onClick={() => handleDelete(d.id)}
              >
                <BsFillTrashFill />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
