import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/isDarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppWithTheme />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

function AppWithTheme() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <App />
    </div>
  );
}
