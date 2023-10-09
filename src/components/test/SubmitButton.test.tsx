import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SubmitButton from "../form/SubmitButton";

const buttonText = "버튼";

describe("SubmitButton", () => {
  it("스냅샷 테스트", () => {
    const { asFragment } = renderSubmitButton(buttonText, true);
    expect(asFragment()).toMatchSnapshot();
  });

  it("prop으로 들어온 값을 올바르게 표시해야한다", () => {
    renderSubmitButton(buttonText, true);
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  function renderSubmitButton(text: string, loading: boolean) {
    return render(<SubmitButton text={text} loading={loading} />);
  }
});
