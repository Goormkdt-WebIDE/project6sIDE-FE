import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormValue {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const password = useRef<string | null>(null);
  password.current = watch("password");

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      setLoading(true);
      // 데이터를 서버로 보내는 로직 추가
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-opacity-25 flex items-center justify-center"
      style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/src/assets/background.jpeg')" }}
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

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="border-none rounded-md p-2 w-full mt-4"
            />
            {errors.email && (
              <p className="text-red-500">
                <span className="inline-block align-middle">⚠ </span>
                This email field is required
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="border-none rounded-md p-2 w-full mt-4"
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-500">
                <span className="inline-block align-middle">⚠ </span>
                This password field is required
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-500">
                Password must have at least 6 characters
              </p>
            )}

            <input
              type="submit"
              disabled={loading}
              value="Sign in"
              className="bg-indigo-400 text-white text-uppercase border-none rounded-md p-2 w-full my-4 text-xl font-thin letter-spacing-2 hover:bg-indigo-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80"
            />
            <Link to="/register" className="text-gray-600 text-sm mt-4 pr-4 hover:underline mb-2">
              REGISTER
            </Link>
            <Link to="/register" className="text-gray-600 text-sm mt-4 pl-4 border-b hover:underline pb-4">
              PASSWORD RESET
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
