import React from "react";

type Props = {
  text: string;
  loading: boolean;
};

export default function SubmitButton({ text, loading }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-400 text-white text-uppercase border-none rounded-md p-2 w-full my-4 text-xl font-thin letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
    >
      {text}
    </button>
  );
}
