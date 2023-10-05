import axios from "axios";
import { BASE_URL } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
};

const route = {
  CREATE_NEW_PROJECT: BASE_URL + "/api/projects/save",
  GET_PROJECT: BASE_URL + "/api/projects",
  GET_ALL_PROJECTS: BASE_URL + "/api/projects/user",
  ADD_ROOT_DIRECTORY(projectId: string) {
    return BASE_URL + `/api/projects/${projectId}/directories`;
  },
  ADD_ROOT_CODE(projectId: string) {
    return BASE_URL + `/api/projects/${projectId}/code`;
  },
  ADD_SUB_DIRECTORY(projectId: string, directoryId: string) {
    return BASE_URL + `/api/projects/directories/${projectId}/${directoryId}`;
  },
  ADD_CODE_TO_SUB_DIRECTORY(projectId: string, directoryId: string) {
    return (
      BASE_URL + `/api/projects/directories/${projectId}/${directoryId}/code`
    );
  },
  DELETE_DIRECTORY(projectId: string, directoryId: string) {
    return BASE_URL + `/api/projects/directories/${projectId}/${directoryId}`;
  },
  DELETE_CODE(projectId: string, codeId: string) {
    return BASE_URL + `/api/projects/${projectId}/${codeId}/code`;
  },
  DELETE_PROJECT(projectId: string) {
    return BASE_URL + `/api/projects/${projectId}`;
  },
  UPDATE_DIRECTORY(projectId: string, directoryId: string) {
    return BASE_URL + `/api/projects/${projectId}/${directoryId}/directories`;
  },
  UPDATE_CODE(projectId: string, codeId: string) {
    return BASE_URL + `/api/projects/${projectId}/${codeId}/code`;
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

export async function getAllProjects() {
  return axios.get(route.GET_ALL_PROJECTS);
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

export async function addSubDirectory(
  name: string,
  projectId: string,
  directoryId: string
) {
  return axios.post(route.ADD_SUB_DIRECTORY(projectId, directoryId), {
    name,
  });
}

export async function addCodeToSubDirectory(
  name: string,
  text: string,
  projectId: string,
  directoryId: string
) {
  return axios.post(route.ADD_CODE_TO_SUB_DIRECTORY(projectId, directoryId), {
    name,
    text,
  });
}

export async function deleteDirectory(projectId: string, directoryId: string) {
  return axios.delete(route.DELETE_DIRECTORY(projectId, directoryId));
}

export async function deleteCode(projectId: string, codeId: string) {
  return axios.delete(route.DELETE_CODE(projectId, codeId));
}

export async function deleteProject(projectId: string) {
  return axios.delete(route.DELETE_PROJECT(projectId));
}

export async function updateDirectory(
  name: string,
  projectId: string,
  directoryId: string
) {
  return axios.patch(route.UPDATE_DIRECTORY(projectId, directoryId), {
    name,
  });
}

export async function updateCode(
  name: string,
  text: string,
  projectId: string,
  codeId: string
) {
  return axios.patch(route.UPDATE_CODE(projectId, codeId), {
    name,
    text,
  });
}
