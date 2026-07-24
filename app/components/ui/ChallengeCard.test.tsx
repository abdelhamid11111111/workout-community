import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChallengeCard from "./ChallengeCard";

// Mock next/image so `fill` never lands on the DOM as a boolean attribute
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// Mock framer-motion so mount/exit animations can't affect click timing in jsdom
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}));

describe("ChallengeCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ currentStreak: 5 }),
      }),
    ) as jest.Mock;
  });

  it("should send a DELETE request when leaving a challenge", async () => {
    const mockOnDelete = jest.fn();
    const user = userEvent.setup();

    const mockData = {
      workoutCount: 3,
      joinedAt: new Date("2026-07-01"),
      isCompleted: false,
      challenge: {
        id: "c1",
        title: "30 Day Challenge",
        category: "Strength",
        level: "Intermediate",
        days: "30",
        imgs: ["/placeholder.jpg"],
      },
    } as any;

    render(<ChallengeCard userChallenge={mockData} onDelete={mockOnDelete} />);

    // Let the mount-time streak fetch resolve first, so it doesn't get
    // confused with the click-triggered delete fetch.
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/workout/c1");
    });

    const leaveButton = screen.getByRole("button", { name: /leave challenge/i });
    await user.click(leaveButton);

    await waitFor(() => {
      // Use toHaveBeenLastCalledWith — there are two calls total
      // (the mount GET, then this DELETE), so asserting on "any call"
      // can mask a bug where the DELETE call never fires.
      expect(global.fetch).toHaveBeenLastCalledWith(
        "/api/workout/c1",
        expect.objectContaining({ method: "DELETE" }),
      );
    });

    expect(mockOnDelete).toHaveBeenCalledWith("c1");
  });
});