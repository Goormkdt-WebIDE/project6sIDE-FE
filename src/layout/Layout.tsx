import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "../context/AuthContext";
import TopBtnContainer from "../components/TopBtnContainer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "../context/isDarkModeContext";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider>
          <div className="relative">
            <TopBtnContainer className="hidden md:flex" />
            <main className="h-screen overflow-hidden pb-4">
              <Outlet />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </main>
          </div>
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
