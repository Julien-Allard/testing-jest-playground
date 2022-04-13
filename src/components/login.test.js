import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./login";

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
