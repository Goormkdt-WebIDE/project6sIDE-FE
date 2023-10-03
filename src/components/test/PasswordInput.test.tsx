import "@testing-library/jest-dom";
import PasswordInput from "../form/PasswordInput";
import { FieldError } from "react-hook-form";
import { render, screen } from "@testing-library/react";
import React from "react";
import { FormValue } from "../../service/http-requests/user-api";

describe("PasswordInput", () => {
  const register = jest.fn();

  afterEach(() => {
    register.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderPasswordInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it("placeholder prop을 전달하면 그것을 올바르게 render 해야한다", () => {
    const placeholder = "Password를 입력하세요";
    renderPasswordInput(placeholder);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("required 에러가 발생하면 밑에 에러가 표시되어야한다", () => {
    renderPasswordInput("", { type: "required" } as FieldError);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("minLength 에러가 발생하면 밑에 에러가 표시되어야한다", () => {
    renderPasswordInput("", { type: "minLength" } as FieldError);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  function renderPasswordInput(placeholder?: string, error?: FieldError) {
    return render(
      <PasswordInput<FormValue>
        register={register}
        errors={{ password: error }}
        placeholder={placeholder}
        name="password"
      />
    );
  }
});
