import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmailInput from "../components/form/EmailInput";
import PasswordInput from "../components/form/PasswordInput";

import SubmitButton from "../components/form/SubmitButton";
import { AxiosError } from "axios";
import { FormValue } from "../service/http-requests/user-api";
import { notifyError, notifySuccess } from "../service/toast";
import { useAuthContext } from "../context/AuthContext";
import { useTheme } from "../context/isDarkModeContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, onAuthStateChange } = useAuthContext();

  const navigate = useNavigate();

  const theme = useTheme();

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      const res = await login(data);
      document.cookie = `token=${res.data as string}; path=/`;
      onAuthStateChange("login");
      notifySuccess("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = `로그인에 실패했습니다. : ${axiosError.code}`;
      notifyError(message);
      setErrorFromSubmit(message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center">
      <div className="text-center items-center w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-blue-500 text-5xl pb-4 mb-2 border-none font-thin">
            6S IDE
          </h1>
          <h3 className={`text-black text-3xl pb-4 mb-2 border-none font-thin ${theme.theme === 'dark' ? 'text-white' : ''}`}>
            Sign in
          </h3>
          <form
            className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
            onSubmit={handleSubmit(onSubmit)}
          >
            <EmailInput<FormValue>
              register={register}
              errors={errors}
              name="email"
            />
            <PasswordInput<FormValue>
              register={register}
              errors={errors}
              name="password"
            />
            <SubmitButton text="Sign In" loading={loading} />
            <Link
              to="/register"
              className={`text-gray-600 text-sm mt-4 pr-4 hover:underline mb-2  ${theme.theme === 'dark' ? 'text-white' : ''}`}
            >
              REGISTER
            </Link>
            <Link
              to="/password-reset"
              className={`text-gray-600 text-sm mt-4 pl-4 hover:underline pb-4 ${theme.theme === 'dark' ? 'text-white' : ''}`}
            >
              PASSWORD RESET
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
