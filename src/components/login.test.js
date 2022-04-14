import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

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
test("if username or password inputs are empty, button is disabled", () => {
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

test("login button should not be disabled when username and password input both exist", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(loginButton).not.toBeDisabled();
});

test("Please wait should not be rendered", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  expect(loginButton.value).toBe("Login");
});

test("Login button should become Please Wait when fetching data", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  expect(loginButton.value).toBe("Please wait...");
});

test("Login button should become Disconnect when user is connected", async () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  await waitFor(() => expect(loginButton.value).toBe("Disconnect"));
});

test("Username should be rendered on top of inputs when connected", async () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(loginButton);

  const usernameText = await screen.findByTestId("username-text");

  await waitFor(() => expect(usernameText).toBeInTheDocument());
});
