import "@testing-library/jest-dom";
import { SecondaryButton, PrimaryButton } from "./Button";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const cta = "Sign up now";
const mockOnClick = jest.fn();

describe(SecondaryButton, () => {
  beforeEach(cleanup);

  it("renders cta", () => {
    render(<SecondaryButton>{cta}</SecondaryButton>);

    expect(screen.getByText(cta)).toBeInTheDocument();
  });

  it("calls onClick handler", async () => {
    const cta = "Sign up now";
    render(<SecondaryButton onClick={mockOnClick}>{cta}</SecondaryButton>);

    await userEvent.click(screen.getByText(cta));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe(PrimaryButton, () => {
  beforeEach(cleanup);

  it("renders cta", () => {
    render(<PrimaryButton>{cta}</PrimaryButton>);

    expect(screen.getByText(cta)).toBeInTheDocument();
  });

  it("calls onClick handler", async () => {
    const cta = "Click me";
    render(<PrimaryButton onClick={mockOnClick}>{cta}</PrimaryButton>);

    await userEvent.click(screen.getByText(cta));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
