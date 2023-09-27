import { MemoryRouter, Routes } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
import { AxiosResponse } from "axios";

export function withRouter(routes: React.ReactElement, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAuthContext(
  children: React.ReactElement,
  authObject: Partial<AuthContextProps> = {}
) {
  const completeAuthObject: AuthContextProps = {
    login:
      authObject.login ||
      jest.fn().mockResolvedValue({} as AxiosResponse<unknown, unknown>),
    register:
      authObject.register ||
      jest.fn().mockResolvedValue({} as AxiosResponse<unknown, unknown>),
    passwordReset:
      authObject.passwordReset ||
      jest.fn().mockResolvedValue({} as AxiosResponse<unknown, unknown>),
  };
  return (
    <AuthContext.Provider value={completeAuthObject}>
      {children}
    </AuthContext.Provider>
  );
}
