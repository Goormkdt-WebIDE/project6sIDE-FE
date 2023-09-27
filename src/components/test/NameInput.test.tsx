import "@testing-library/jest-dom";
import { FieldError } from "react-hook-form";
import NameInput from "../NameInput";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("NameInput", () => {
  const register = jest.fn();

  afterEach(() => {
    register.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderNameInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it("placeholder prop을 전달하면 그것을 올바르게 render 해야한다", () => {
    const placeholder = "Name을 입력하세요";
    renderNameInput(placeholder);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("에러가 발생하면 밑에 에러가 표시되어야한다", () => {
    renderNameInput("", {} as FieldError);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Max Length 에러가 발생하면 밑에 에러가 표시되어야한다", () => {
    renderNameInput("", { type: "maxLength" } as FieldError);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  function renderNameInput(placeholder?: string, error?: FieldError) {
    return render(
      <NameInput
        register={register}
        errors={{ name: error }}
        placeholder={placeholder}
      />
    );
  }
});
