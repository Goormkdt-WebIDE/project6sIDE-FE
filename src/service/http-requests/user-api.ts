import axios from "axios";
import { userAPIRoute } from "../../common/constant";

export type FormValue = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export async function login(data: FormValue) {
  return axios.post(userAPIRoute.LOGIN, {
    email: data.email,
    password: data.password,
  });
}

export async function register(data: FormValue) {
  return axios.post(userAPIRoute.REGISTER, {
    username: data.name,
    email: data.email,
    password: data.password,
  });
}

export async function passwordReset(data: FormValue) {
  return axios.post(userAPIRoute.PASSWORD_RESET, {
    email: data.email,
    password: data.password,
    newPassword: data.password_confirm,
  });
}
