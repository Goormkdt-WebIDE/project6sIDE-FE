import axios from "axios";
import { BASE_URL } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
};

const route = {
  CREATE_NEW_PROJECT: BASE_URL + "/api/projects/save",
  GET_PROJECT: BASE_URL + "/api/projects",
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
