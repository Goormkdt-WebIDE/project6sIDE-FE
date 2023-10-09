import axios from "axios";
import { ideAPIRoute } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
};

export async function createNewProject(data: FormValue) {
  return axios.post(ideAPIRoute.CREATE_NEW_PROJECT, {
    name: data.name,
    email: data.email,
  });
}

export async function deleteProject(projectId: string) {
  return axios.delete(ideAPIRoute.DELETE_PROJECT(projectId));
}

export async function getProject(data: FormValue) {
  return axios.post(ideAPIRoute.GET_PROJECT, {
    email: data.email,
    projectName: data.name,
  });
}

export async function getAllProjects() {
  return axios.get(ideAPIRoute.GET_ALL_PROJECTS);
}

export async function addRootDirectory(name: string, projectId: string) {
  return axios.post(ideAPIRoute.ADD_ROOT_DIRECTORY(projectId), {
    name,
  });
}

export async function addRootCode(
  name: string,
  text: string,
  projectId: string
) {
  return axios.post(ideAPIRoute.ADD_ROOT_CODE(projectId), {
    name,
    text,
  });
}

export async function addSubDirectory(
  name: string,
  projectId: string,
  directoryId: string
) {
  return axios.post(ideAPIRoute.ADD_SUB_DIRECTORY(projectId, directoryId), {
    name,
  });
}

export async function addCodeToSubDirectory(
  name: string,
  text: string,
  projectId: string,
  directoryId: string
) {
  return axios.post(
    ideAPIRoute.ADD_CODE_TO_SUB_DIRECTORY(projectId, directoryId),
    {
      name,
      text,
    }
  );
}

export async function deleteDirectory(projectId: string, directoryId: string) {
  return axios.delete(ideAPIRoute.DELETE_DIRECTORY(projectId, directoryId));
}

export async function deleteCode(projectId: string, codeId: string) {
  return axios.delete(ideAPIRoute.DELETE_CODE(projectId, codeId));
}

export async function updateDirectory(
  name: string,
  projectId: string,
  directoryId: string
) {
  return axios.patch(ideAPIRoute.UPDATE_DIRECTORY(projectId, directoryId), {
    name,
  });
}

export async function updateCode(
  name: string,
  text: string,
  projectId: string,
  codeId: string
) {
  return axios.patch(ideAPIRoute.UPDATE_CODE(projectId, codeId), {
    name,
    text,
  });
}
