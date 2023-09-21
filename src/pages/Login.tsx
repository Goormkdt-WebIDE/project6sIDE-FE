import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

import SubmitButton from "../components/SubmitButton";
import { AxiosError } from "axios";
import { FormValue, login } from "../service/http-requests/user-api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);

      await login(data);

      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorFromSubmit(axiosError.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/src/assets/background.jpeg')",
      }}
    >
      <div className="text-center items-center w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-blue-500 text-5xl pb-4 mb-2 border-none font-thin">
            6S IDE
          </h1>
          <h3 className="text-black text-3xl pb-4 mb-2 border-none font-thin">
            Sign in
          </h3>
          <form
            className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
            onSubmit={handleSubmit(onSubmit)}
          >
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />

            <SubmitButton text="Sign In" loading={loading} />
            <Link
              to="/register"
              className="text-gray-600 text-sm mt-4 pr-4 hover:underline mb-2"
            >
              REGISTER
            </Link>
            <Link
              to="/password-reset"
              className="text-gray-600 text-sm mt-4 pl-4 border-b hover:underline pb-4"
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
