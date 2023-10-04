import axios from "axios";
import { BASE_URL } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
};

const route = {
  CREATE_NEW_PROJECT: BASE_URL + "/api/projects/save",
  GET_PROJECT: BASE_URL + "/api/projects",
  ADD_ROOT_DIRECTORY(projectId: string) {
    return BASE_URL + `/api/projects/v2/${projectId}/directories`;
  },
  ADD_ROOT_CODE(projectId: string) {
    return BASE_URL + `/api/projects/v2/${projectId}/code`;
  },
  DELETE_DIRECTORY(directoryId: string) {
    return BASE_URL + `/api/projects/v2/directories/${directoryId}`;
  },
  DELETE_CODE(codeId: string) {
    return BASE_URL + `/api/projects/v2/${codeId}/code`;
  },
  DELETE_PROJECT(projectId: string) {
    return BASE_URL + `/api/projects/${projectId}`;
  },
};

export async function createNewProject(data: FormValue) {
  return axios.post(route.CREATE_NEW_PROJECT, {
    name: data.name,
    email: data.email,
  });
}

export async function getProject(data: FormValue) {
  return axios.post(route.GET_PROJECT, {
    email: data.email,
    projectName: data.name,
  });
}

export async function addRootDirectory(name: string, projectId: string) {
  return axios.post(route.ADD_ROOT_DIRECTORY(projectId), {
    name,
  });
}

export async function addRootCode(
  name: string,
  text: string,
  projectId: string
) {
  return axios.post(route.ADD_ROOT_CODE(projectId), {
    name,
    text,
  });
}

export async function deleteDirectory(directoryId: string) {
  return axios.delete(route.DELETE_DIRECTORY(directoryId));
}

export async function deleteCode(codeId: string) {
  return axios.delete(route.DELETE_CODE(codeId));
}

export async function deleteProejct(projectId: string) {
  return axios.delete(route.DELETE_PROJECT(projectId));
}
