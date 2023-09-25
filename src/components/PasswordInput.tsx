import React from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { FormValue } from "../service/http-requests/user-api";

type Props = {
  register: UseFormRegister<FormValue>;
  errors: UseFormReturn<FormValue>["formState"]["errors"];
  placeholder?: string;
  register_type?: "password" | "password_confirm";
};

const PasswordInput = ({
  register,
  errors,
  placeholder,
  register_type,
}: Props) => {
  return (
    <>
      <input
        type="password"
        placeholder={placeholder ? placeholder : "Password"}
        {...register(register_type ? register_type : "password", {
          required: true,
          minLength: 6,
        })}
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
