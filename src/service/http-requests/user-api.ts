import axios from "axios";
import { BASE_URL } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const route = {
  LOGIN: BASE_URL + "/user/login",
  REGISTER: BASE_URL + "/user/signUp",
  PASSWORD_RESET: BASE_URL + "/user/resetPassword",
};

export async function login(data: FormValue) {
  return axios.post(route.LOGIN, {
    email: data.email,
    password: data.password,
  });
}

export async function register(data: FormValue) {
  return axios.post(route.REGISTER, {
    username: data.name,
    email: data.email,
    password: data.password,
  });
}

export async function passwordReset(data: FormValue) {
  return axios.post(route.PASSWORD_RESET, {
    email: data.email,
    password: data.password,
    newPassword: data.password_confirm,
  });
}
