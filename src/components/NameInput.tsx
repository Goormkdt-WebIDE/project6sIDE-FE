import React from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { FormValue } from "../pages/Register";

type Props = {
  register: UseFormRegister<FormValue>;
  errors: UseFormReturn<FormValue>["formState"]["errors"];
  placeholder?: string;
};

const NameInput = ({ register, errors, placeholder }: Props) => {
  return (
    <>
      <input
        placeholder={placeholder ? placeholder : "Name"}
        {...register("name", { required: true, maxLength: 10 })}
        className="border rounded-md p-2 w-full mt-4"
      />
      {errors.name && (
        <p className="text-red-500">
          <span className="inline-block align-middle mb-2.5">⚠ </span>
          This name field is required
        </p>
      )}
      {errors.name?.type === "maxLength" && (
        <p className="text-red-500">Your input exceeds the maximum length</p>
      )}
    </>
  );
};

export default NameInput;