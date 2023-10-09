export const BASE_URL = "https://sside.shop";

export const userAPIRoute = {
  LOGIN: BASE_URL + "/user/login",
  REGISTER: BASE_URL + "/user/signUp",
  PASSWORD_RESET: BASE_URL + "/user/resetPassword",
};

export const ideAPIRoute = {
  CREATE_NEW_PROJECT: BASE_URL + "/api/projects/save",
  DELETE_PROJECT(projectId: string) {
    return BASE_URL + `/api/projects/${projectId}`;
  },
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

  UPDATE_DIRECTORY(projectId: string, directoryId: string) {
    return BASE_URL + `/api/projects/${projectId}/${directoryId}/directories`;
  },
  UPDATE_CODE(projectId: string, codeId: string) {
    return BASE_URL + `/api/projects/${projectId}/${codeId}/code`;
  },
};
