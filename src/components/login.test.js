import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./login";

//TESTS FOR RENDERING AND CONTENT
test("username placeholder input should be rendered", () => {
  render(<Login />);
  const usernamePlaceholder = screen.getByPlaceholderText(/username/i);
  expect(usernamePlaceholder).toBeInTheDocument();
});

test("password placeholder input should be rendered", () => {
  render(<Login />);
  const passwordPlaceholder = screen.getByPlaceholderText(/password/i);
  expect(passwordPlaceholder).toBeInTheDocument();
});

test("login button should be rendered", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeInTheDocument();
});

test("username input should be empty on rendering", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  expect(usernameInput.value).toBe("");
});

test("password input should be empty on rendering", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});

//TEST FOR FUNCTIONNALITY
test("if username or password are empty, button is disabled", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeDisabled();
});

test("error message should not be visible on rendering", () => {
  render(<Login />);
  const errorMessage = screen.getByText("Something went wrong !");
  expect(errorMessage).not.toBeVisible();
});

test("username value should change on input", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});

test("password value should change on input", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});
