import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBtnContainer from "../components/TopBtnContainer";

export default function IDELayout() {
  return (
    <div className="relative">
      <TopBtnContainer className="hidden md:flex md:!-top-1" />
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
  );
}
