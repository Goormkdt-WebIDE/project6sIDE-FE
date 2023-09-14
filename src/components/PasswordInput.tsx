import React from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";

interface FormValue {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface PasswordInputProps {
  register: UseFormRegister<FormValue>;
  errors: UseFormReturn<FormValue>["formState"]["errors"];
}

const PasswordInput: React.FC<PasswordInputProps> = ({ register, errors }) => {
  return (
    <>
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
        <p className="text-red-500">Password must have at least 6 characters</p>
      )}
    </>
  );
};

export default PasswordInput;
