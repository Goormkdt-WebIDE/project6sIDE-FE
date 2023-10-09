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
  user: User | undefined | null;
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  login,
  register,
  passwordReset,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAuthStateChange: (_: AuthStateChangeType) => {},
  user: undefined,
  isInitializing: true,
});

type Props = {
  children: React.ReactElement;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<undefined | User | null>();
  const [isInitializing, setIsInitializing] = useState(true);

  const initialize = () => {
    const token = getToken("token");
    const decodedUser = token && decodeToken(token);
    if (token && decodedUser) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setUser(decodedUser);
    }
  };

  useEffect(() => {
    initialize();
    setIsInitializing(false);
  }, []);

  const onAuthStateChange = (type: AuthStateChangeType) => {
    if (type === "login") {
      initialize();
      return;
    }
    setUser(undefined);
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        passwordReset,
        onAuthStateChange,
        user,
        isInitializing,
      }}
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

function decodeToken(token: string): User | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [headerEncoded, payloadEncoded] = token.split(".");

  const payloadStr = atob(payloadEncoded);

  const payloadObj = JSON.parse(payloadStr);

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (payloadObj.exp && payloadObj.exp < currentTimestamp) {
    return null;
  }

  return payloadObj;
}
