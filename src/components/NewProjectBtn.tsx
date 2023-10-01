import React from "react";

type Props = {
    text: string;
};

export default function SubmitButton({ text }: Props) {
    return (
        <>
            <button
                className="bg-blue-400 text-white text-uppercase border-none rounded-md p-2 w-full my-4 text-xl font-thin letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
            >
                {text}
            </button>
        </>
    );
}
