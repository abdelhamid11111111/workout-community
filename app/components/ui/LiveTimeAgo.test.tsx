import { render, screen } from "@testing-library/react";
import { LiveTimeAgo } from "./LiveTimeAgo";

describe("LiveTimeAgo", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-24T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders a relative time string", () => {
    render(
      <LiveTimeAgo date={new Date("2026-07-24T11:59:00Z").toISOString()} />,
    );

    expect(screen.getByText("1 minute ago")).toBeInTheDocument();
  });
});
