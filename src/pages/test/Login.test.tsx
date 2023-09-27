import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withAuthContext, withRouter } from "../../test/utils";
import Login from "../Login";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";

const mainPageParagraph = "메인 페이지 입니다.";
const testEmail = "test@gmail.com";
const testPassword = "password";

describe("Login", () => {
  const fakeAuthObj = {
    login: jest.fn(),
  };

  afterEach(() => {
    fakeAuthObj.login.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderLogin();
    expect(asFragment()).toMatchSnapshot();
  });

  it("로그인 성공 시, 메인 페이지로 이동해야한다.", async () => {
    fakeAuthObj.login.mockImplementation(() =>
      Promise.resolve({ data: "로그인성공" })
    );
    renderLogin();

    await userEvent.type(screen.getByPlaceholderText("Email"), testEmail);

    await userEvent.type(screen.getByPlaceholderText("Password"), testPassword);

    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(mainPageParagraph)).toBeInTheDocument();
  });

  it("로그인 실패 시, 로그인이 실패했다는 문구가 떠야한다", async () => {
    fakeAuthObj.login.mockImplementation(() => {
      throw new Error();
    });

    renderLogin();

    await userEvent.type(screen.getByPlaceholderText("Email"), testEmail);

    await userEvent.type(screen.getByPlaceholderText("Password"), testPassword);

    await userEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText(/로그인에 실패했습니다./i)
    ).toBeInTheDocument();
  });

  function renderLogin() {
    return render(
      withAuthContext(
        withRouter(
          <>
            <Route
              path="/login"
              element={
                <>
                  <Login />
                  <ToastContainer />
                </>
              }
            />
            <Route path="/" element={<p>{mainPageParagraph}</p>}></Route>
          </>,
          "/login"
        ),
        fakeAuthObj
      )
    );
  }
});
