import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import customAxios from "../utils/axios";
import store from "../redux/store";
import Login from "./Loginpage";

const WrappedLogin = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
};

describe("Login", () => {
  let renderResult; // Take { unmount, rerender }

  const getUser = () => userEvent.setup();
  const getEmailInput = () => screen.getByLabelText("emailInput");
  const getPasswordInput = () => screen.getByLabelText("passwordInput");
  const getSubmitButton = () => screen.getByLabelText("loginBtn");

  beforeAll(() => {});

  beforeEach(() => {
    renderResult = render(<WrappedLogin />);
  });

  afterEach(() => {
    renderResult.unmount();

    vi.resetAllMocks();
    localStorage.clear();
  });

  test("should show input change when typing", async () => {
    const user = getUser();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();

    // Email test
    await user.type(emailInput, "hello@gmail.com");
    expect(emailInput.value).toBe("hello@gmail.com");

    // Password test
    await user.type(passwordInput, "myPass");
    expect(passwordInput.value).toBe("myPass");
  });

  test("should show error 'Email is required' when submitting empty email", async () => {
    const user = userEvent.setup();
    const submitButton = getSubmitButton();

    await user.click(submitButton);

    expect(await screen.findByText(/Email is required./i)).toBeInTheDocument();
  });

  test("should show email validation when format is invalid", async () => {
    const user = getUser();
    const emailInput = getEmailInput();
    const submitButton = getSubmitButton();

    await user.type(emailInput, "bad-email");
    await user.click(submitButton);

    expect(await screen.findByText(/Email is not valid/i)).toBeInTheDocument();
  });

  test("should show password required when password is empty", async () => {
    const user = getUser();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getSubmitButton();

    await user.type(emailInput, "valid@example.com");
    await user.clear(passwordInput);
    await user.click(submitButton);

    expect(await screen.findByText(/password.*required/i)).toBeInTheDocument();
  });

  test("should show error when password is invalid and reset password field", async () => {
    const user = getUser();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getSubmitButton();

    await user.type(emailInput, "valid@example.com");
    await user.type(passwordInput, "123"); // invalid: <6 chars, no uppercase, ...
    await user.click(submitButton);

    expect(
      await screen.findByText(
        /Password must be at least 6 characters long.|Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char/i
      )
    ).toBeInTheDocument();

    expect(passwordInput.value).toBe("");
  });

  // TODO: FIX
  test("should show 'Sending...', store token, update auth state and navigate to /chat on success", async () => {
    const user = getUser();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getSubmitButton();

    const mockResponse = {
      status: 200,
      data: {
        token: "test-token",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "user@example.com",
      },
    };
    const spy = vi.spyOn(customAxios, "post").mockResolvedValue(mockResponse);

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "Password1!");
    await user.click(submitButton);

    expect(await screen.findByText(/Sending.../i)).toBeInTheDocument();

    await act(async () => {
      await Promise.resolve();
    });

    expect(spy).toHaveBeenCalledWith("/api/Auth/Login", {
      email: "user@example.com",
      password: "Password1!",
    });
    expect(localStorage.getItem("token")).toBe("test-token");

    // Assert redux auth state updated
    const state = store.getState();
    expect(state.auth.user).toEqual({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "user@example.com",
    });

    // Assert navigation to /chat
    expect(screen.getByLabelText("current-path").textContent).toBe("/chat");
  });

  // TODO: should show error message
});
