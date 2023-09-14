import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import NameInput from "../components/NameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

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
    formState: { errors },
  } = useForm<FormValue>();

  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    try {
      setLoading(true);
      // 데이터를 서버로 보내는 로직 추가
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      console.log(createUser);

      await firebase.database().ref("users").child(createUser.user.uid).set({
        name: createUser.user.displayName,
        image: createUser.user.photoURL,
      });
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
      style={{ backgroundImage: "url('/src/assets/background.jpeg')" }}
    >
      <div className="text-center items-center w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-black text-4xl pb-4 mb-2 border-none font-thin">
            Register
          </h1>
          <form
            className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
            onSubmit={handleSubmit(onSubmit)}
          >
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <input
              type="submit"
              disabled={loading}
              className="bg-blue-400 text-white text-uppercase border-none rounded-md p-2 w-full my-4 text-xl font-thin letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80"
            />
            <Link to="/login" className="text-gray-600 text-sm mt-4">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
