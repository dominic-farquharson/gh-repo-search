import "@testing-library/jest-dom";
import { Pagination, type PaginationProps } from "./Pagination";
import { cleanup, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));
jest.mock("next/router", (): jest.Mock => jest.requireActual("next-router-mock"));

const mockProps: PaginationProps = {
  currentPage: 2,
  hasNextPage: false,
  hasPrevPage: false,
  isLoading: false,
};

const setup = (props = mockProps) => {
  render(<Pagination {...props} />);
};

describe(Pagination, () => {
  beforeEach(cleanup);

  it("renders a back button when hasPrevPage is true and navigates user to the correct page", async () => {
    setup({
      ...mockProps,
      hasPrevPage: true,
    });

    const backBtn = screen.getByText("Back");

    expect(backBtn).toBeInTheDocument();

    await userEvent.click(backBtn);

    expect(mockRouter.asPath).toEqual("/?page=1");
  });

  it("renders a next button when hasNextPage is true and navigates user to the correct page", async () => {
    setup({
      ...mockProps,
      hasNextPage: true,
    });

    const nextBtn = screen.getByText("Next");

    expect(nextBtn).toBeInTheDocument();

    await userEvent.click(nextBtn);

    expect(mockRouter.asPath).toEqual("/?page=3");
  });
});
