import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
// import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import IDE from "./pages/IDE";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/workspace" element={<IDE />} />
      </Route>
    </Routes>
  );
}

export default App;
