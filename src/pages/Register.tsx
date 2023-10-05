import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NameInput from "../components/form/NameInput";
import EmailInput from "../components/form/EmailInput";
import PasswordInput from "../components/form/PasswordInput";
import SubmitButton from "../components/form/SubmitButton";
import { AxiosError } from "axios";
import { FormValue } from "../service/http-requests/user-api";
import { notifyError, notifySuccess } from "../service/toast";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const { register: registerAPI } = useAuthContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      const response = await registerAPI(data);
      notifySuccess(response.data as string);
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = `회원가입에 실패했습니다. : ${axiosError.code}`;
      notifyError(message);
      setErrorFromSubmit(message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center">
        <div className="text-center items-center w-full">
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-blue-500 text-5xl pb-4 mb-2 border-none font-thin">
              6S IDE
            </h1>
            <h3 className="text-black text-3xl pb-4 mb-2 border-none font-thin">
              Register
            </h3>
            <form
              className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
              onSubmit={handleSubmit(onSubmit)}
            >
              <NameInput<FormValue>
                register={register}
                errors={errors}
                name="name"
              />
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
              <SubmitButton text="Register" loading={loading} />
              <Link to="/login" className="text-gray-600 text-sm mt-4">
                Already have an account? Sign in
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
