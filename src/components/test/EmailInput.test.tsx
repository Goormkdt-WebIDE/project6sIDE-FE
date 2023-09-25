import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmailInput from "../EmailInput";
import { FieldError } from "react-hook-form";
import React from "react";

describe("EmailInput", () => {
  const register = jest.fn();

  afterEach(() => {
    register.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderEmailInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it("placeholder prop을 전달하면 그것을 올바르게 render 해야한다", () => {
    const placeholder = "Email을 입력하세요";
    renderEmailInput(placeholder);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("에러가 발생하면 밑에 에러가 표시되어야한다", () => {
    renderEmailInput("", {} as FieldError);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  function renderEmailInput(placeholder?: string, error?: FieldError) {
    return render(
      <EmailInput
        register={register}
        errors={{ email: error }}
        placeholder={placeholder}
      />
    );
  }
});
