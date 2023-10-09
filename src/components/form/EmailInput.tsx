import React from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: UseFormReturn<T>["formState"]["errors"];
  name: keyof T;
  placeholder?: string;
};

function EmailInput<T extends FieldValues>({
  register,
  errors,
  placeholder,
  name,
}: Props<T>) {
  return (
    <>
      <input
        type="email"
        placeholder={placeholder ? placeholder : "Email"}
        {...register(name as Path<T>, {
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
        className="border-none rounded-md p-2 w-full mt-4"
      />
      {errors[name] && (
        <p className="text-red-500" role="alert">
          <span className="inline-block align-middle">⚠ </span>
          This email field is required
        </p>
      )}
    </>
  );
}

export default EmailInput;
