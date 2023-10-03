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
  placeholder?: string;
  name: keyof T;
};

function PasswordInput<T extends FieldValues>({
  register,
  errors,
  placeholder,
  name,
}: Props<T>) {
  return (
    <>
      <input
        type="password"
        placeholder={placeholder ? placeholder : "Password"}
        {...register(name as Path<T>, {
          required: true,
          minLength: 6,
        })}
        className="border-none rounded-md p-2 w-full mt-4"
      />
      {errors[name] && errors[name]?.type === "required" && (
        <p className="text-red-500" role="alert">
          <span className="inline-block align-middle">⚠ </span>
          This password field is required
        </p>
      )}
      {errors[name] && errors[name]?.type === "minLength" && (
        <p className="text-red-500" role="alert">
          Password must have at least 6 characters
        </p>
      )}
    </>
  );
}

export default PasswordInput;
