import React, { useState } from "react";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  className?: string;
  options?: Option[];
  onClick?: (value?: { value: string; label: string }) => void;
};

const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any) => ({
    ...provided,
    appearance: "button",
    color: "black",
    border: "1px solid #ccc",
    boxShadow: "none",
    cursor: "pointer",
    width: 85,
    textAlign: "center",
    ":hover": {
      backgroundColor: "rgb(226 232 240)", // Set hover background color here
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: (provided: any) => ({
    ...provided,
    zIndex: 10,
  }),
};

export default function IDEMenuButton({
  placeholder,
  className,
  options,
  onClick,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <Select
      defaultValue={selectedOption}
      onChange={(value) => {
        setSelectedOption(value);
        if (onClick) {
          value ? onClick(value) : onClick();
        }
      }}
      options={options}
      styles={customStyles}
      isSearchable={false}
      placeholder={placeholder}
      components={{
        DropdownIndicator: null, // This removes the dropdown arrow indicator
      }}
      className={className ? className : ""}
      value={null}
    />
  );
}
