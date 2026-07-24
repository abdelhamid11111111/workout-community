import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from "./page";
import { authClient } from "@/lib/auth-client";

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: jest.fn(),
    },
  },
}));

const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
    back: mockBack,
  }),
}));

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show an error on invalid credentials", async () => {
    (authClient.signIn.email as jest.Mock).mockResolvedValue({
      error: { message: "Invalid email or password." },
    });

    // delay: null disables the artificial per-keystroke delay,
    // so this works whether fake or real timers are active.
    const user = userEvent.setup({ delay: null });

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    await user.type(emailInput, "jane@example.com");
    await user.type(passwordInput, "wrongpassword");

    expect(emailInput).toHaveValue("jane@example.com");
    expect(passwordInput).toHaveValue("wrongpassword");

    expect(jest.isMockFunction(authClient.signIn.email)).toBe(true);

    await user.click(submitButton);

    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith({
        email: "jane@example.com",
        password: "wrongpassword",
      });
    });

    expect(
      await screen.findByText(/Invalid email or password/i),
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});