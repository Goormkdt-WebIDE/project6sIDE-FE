import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { withAuthContext, withRouter } from "../../test/utils";
import { Route } from "react-router-dom";
import PasswordReset from "../PasswordReset";
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";

const loginPageParagraph = "로그인 페이지 입니다.";
const testEmail = "test@gmail.com";
const testPassword = "password";
const newPassword = "password123";

describe("PasswordReset", () => {
  const fakeAuthObj = {
    passwordReset: jest.fn(),
  };

  afterEach(() => {
    fakeAuthObj.passwordReset.mockReset();
  });

  it("스냡샷 테스트", () => {
    const { asFragment } = renderPasswordReset();
    expect(asFragment()).toMatchSnapshot();
  });

  it("비밀번호 변경 성공 시, 로그인 페이지로 이동해야한다", async () => {
    fakeAuthObj.passwordReset.mockImplementation(() =>
      Promise.resolve({ data: "비밀번호 리셋 성공" })
    );
    renderPasswordReset();

    await userEvent.type(screen.getByPlaceholderText("Email"), testEmail);
    await userEvent.type(screen.getByPlaceholderText("Password"), testPassword);
    await userEvent.type(
      screen.getByPlaceholderText("New Password"),
      newPassword
    );

    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(loginPageParagraph)).toBeInTheDocument();
  });

  it("비밀번호 변경 실패 시, 비밀번호 변경에 실패했다는 문구가 나와야한다", async () => {
    fakeAuthObj.passwordReset.mockImplementation(() => {
      throw new Error();
    });

    renderPasswordReset();

    await userEvent.type(screen.getByPlaceholderText("Email"), testEmail);

    await userEvent.type(screen.getByPlaceholderText("Password"), testPassword);

    await userEvent.type(
      screen.getByPlaceholderText("New Password"),
      newPassword
    );

    await userEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText(/비밀번호 변경에 실패했습니다./i)
    ).toBeInTheDocument();
  });

  function renderPasswordReset() {
    return render(
      withAuthContext(
        withRouter(
          <>
            <Route
              path="/password-reset"
              element={
                <>
                  <PasswordReset />
                  <ToastContainer />
                </>
              }
            />
            <Route path="/login" element={<p>{loginPageParagraph}</p>}></Route>
          </>,
          "/password-reset"
        ),
        fakeAuthObj
      )
    );
  }
});
