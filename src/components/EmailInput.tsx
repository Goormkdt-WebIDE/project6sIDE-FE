import React from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { FormValue } from "../pages/Register";

type Props = {
  register: UseFormRegister<FormValue>;
  errors: UseFormReturn<FormValue>["formState"]["errors"];
  placeholder?: string;
};

const EmailInput = ({ register, errors, placeholder }: Props) => {
  return (
    <>
      <input
        type="email"
        placeholder={placeholder ? placeholder : "Email"}
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        className="border-none rounded-md p-2 w-full mt-4"
      />
      {errors.email && (
        <p className="text-red-500">
          <span className="inline-block align-middle">⚠ </span>
          This email field is required
        </p>
      )}
    </>
  );
};

export default EmailInput;
