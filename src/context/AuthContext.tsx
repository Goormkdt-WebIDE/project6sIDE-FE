import { createContext, useContext } from "react";
import {
  login,
  register,
  passwordReset,
  FormValue,
} from "../service/http-requests/user-api";
import { AxiosResponse } from "axios";

export interface AuthContextProps {
  login: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
  register: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
  passwordReset: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => Promise.reject("No AuthProvider"),
  register: () => Promise.reject("No AuthProvider"),
  passwordReset: () => Promise.reject("No AuthProvider"),
});

type Props = {
  children: React.ReactElement;
};

export function AuthContextProvider({ children }: Props) {
  return (
    <AuthContext.Provider value={{ login, register, passwordReset }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}
