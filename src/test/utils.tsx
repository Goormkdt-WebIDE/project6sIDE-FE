import { MemoryRouter, Routes } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

export function withRouter(routes: React.ReactElement, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAuthContext(
  children: React.ReactElement,
  authObject: AuthContextProps
) {
  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
