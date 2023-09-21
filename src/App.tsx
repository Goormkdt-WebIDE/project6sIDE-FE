import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route index path="/" element={<Main />} />  
        {/* 로그인 기능이 온전히 구현 되면 주석 제거 예정 */}
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Route>
    </Routes>
  );
}

export default App;
