import { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  register,
  passwordReset,
  FormValue,
} from "../service/http-requests/user-api";
import axios, { AxiosResponse } from "axios";

export type User = {
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type AuthStateChangeType = "login" | "logout";

export interface AuthContextProps {
  login: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
  register: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
  passwordReset: (data: FormValue) => Promise<AxiosResponse<unknown, unknown>>;
  onAuthStateChange: (type: AuthStateChangeType) => void;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContextProps>({
  login,
  register,
  passwordReset,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAuthStateChange: (_: AuthStateChangeType) => {},
  user: undefined,
});

type Props = {
  children: React.ReactElement;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<undefined | User>();

  useEffect(() => {
    const token = getToken("token");
    const decodedUser = token && decodeToken(token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setUser(decodedUser);
  }, []);

  const onAuthStateChange = (type: AuthStateChangeType) => {
    if (type === "login") {
      const token = getToken("token");
      const decodedUser = token && decodeToken(token);
      setUser(decodedUser);
      return;
    }
    setUser(undefined);
  };
  return (
    <AuthContext.Provider
      value={{ login, register, passwordReset, onAuthStateChange, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}

function getToken(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    return part && part.split(";").shift();
  }
}

function decodeToken(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [headerEncoded, payloadEncoded] = token.split(".");

  const payloadStr = atob(payloadEncoded); // Base64 디코딩

  const payloadObj = JSON.parse(payloadStr); // JSON 파싱

  return payloadObj;
}
