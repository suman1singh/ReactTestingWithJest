import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test the Login component", () => {
  test("render the login form with 2 buttons", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    // console.log(buttonList);
    expect(buttonList).toHaveLength(2);
  });
  test("should failed on email validation", () => {
    const testEmail = "suman@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });
  test("email input field should accept email", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    userEvent.type(email, "suman");
    expect(email.value).not.toMatch("suman@gmail.com");
  });
  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });
  test("should be able to reset the form", () => {
    const { getByTestId } = render(<Login />);
    const resetBtn = getByTestId("reset");
    const emailInputNode1 = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Password");
    fireEvent.click(resetBtn);
    expect(emailInputNode1.value).toMatch("");
    expect(passwordInputNode.value).toMatch("");
  });
  test("should be able to submit the form", () => {
    render(<Login />);
    const submitBtn = screen.getByTestId("submit");
    const emailInputNode1 = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Password");
    userEvent.type(emailInputNode1, "suman@gmail.com");
    userEvent.type(passwordInputNode, "123568");
    userEvent.click(submitBtn);
    const userInfo=screen.getByText("suman@gmail.com")
    expect(userInfo).toBeInTheDocument();
  });
  test("should display error if incorrect email address", () => {
    render(<Login />);
    const submitBtn = screen.getByTestId("submit");
    const emailInputNode1 = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Password");
    userEvent.type(emailInputNode1, "suman");
    userEvent.type(passwordInputNode, "123568");
    userEvent.click(submitBtn);
    const errorMessage=screen.getByText("Email is not valid")
    expect(errorMessage).toBeInTheDocument();
  });
});
