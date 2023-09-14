import React from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";

interface FormValue {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface EmailInputProps {
  register: UseFormRegister<FormValue>;
  errors: UseFormReturn<FormValue>["formState"]["errors"];
}

const EmailInput: React.FC<EmailInputProps> = ({ register, errors }) => {
  return (
    <>
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
    </>
  );
};

export default EmailInput;
