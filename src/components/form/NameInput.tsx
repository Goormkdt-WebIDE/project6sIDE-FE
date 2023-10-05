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

function NameInput<T extends FieldValues>({
  register,
  errors,
  name,
  placeholder,
}: Props<T>) {
  return (
    <>
      <input
        placeholder={placeholder ? placeholder : "Name"}
        {...register(name as Path<T>, { required: true, maxLength: 10 })}
        className="border rounded-md p-2 w-full mt-4"
      />
      {errors[name] && (
        <p className="text-red-500" role="alert">
          <span className="inline-block align-middle mb-2.5">⚠ </span>
          This name field is required
        </p>
      )}
      {errors[name]?.type === "maxLength" && (
        <p className="text-red-500">Your input exceeds the maximum length</p>
      )}
    </>
  );
}

export default NameInput;
