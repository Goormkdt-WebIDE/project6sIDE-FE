import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Register from "../Register";
import { ToastContainer } from "react-toastify";
import { withAuthContext, withRouter } from "../../test/utils";
import { Route } from "react-router-dom";

const loginPageParagraph = "로그인 페이지 입니다.";

describe("Register", () => {
  const fakeAuthObj = {
    register: jest.fn(),
    login: jest.fn(),
    passwordReset: jest.fn(),
  };

  afterEach(() => {
    fakeAuthObj.register.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderRegister();
    expect(asFragment()).toMatchSnapshot();
  });

  it("회원가입 성공 시, login 페이지로 이동해야한다.", async () => {
    fakeAuthObj.register.mockImplementation(() =>
      Promise.resolve({ data: "회원가입성공" })
    );

    renderRegister();

    await userEvent.type(screen.getByPlaceholderText("Name"), "test");

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@gmail.com"
    );

    await userEvent.type(screen.getByPlaceholderText("Password"), "password");

    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(loginPageParagraph)).toBeInTheDocument();
  });

  it("회원가입실패 시, 회원가입에 실패했다는 문구가 떠야한다", async () => {
    fakeAuthObj.register.mockImplementation(() => {
      throw new Error();
    });

    renderRegister();

    await userEvent.type(screen.getByPlaceholderText("Name"), "test");

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@gmail.com"
    );

    await userEvent.type(screen.getByPlaceholderText("Password"), "password");

    await userEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText(/회원가입에 실패했습니다./i)
    ).toBeInTheDocument();
  });

  function Login() {
    return <p>{loginPageParagraph}</p>;
  }

  function renderRegister() {
    return render(
      withAuthContext(
        withRouter(
          <>
            <Route
              path="/register"
              element={
                <>
                  <Register />
                  <ToastContainer />
                </>
              }
            />
            <Route path="/login" element={<Login />}></Route>
          </>,
          "/register"
        ),
        fakeAuthObj
      )
    );
  }
});
