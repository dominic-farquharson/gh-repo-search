import { ReposTable } from "./ReposTable";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { mockGoogleRepos } from "./__mocks__/mockGoogleRepos";

const mockGetParam = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: () => mockGetParam() as jest.Mock,
    set: jest.fn(),
  }),
}));
jest.mock("next/router", (): jest.Mock => jest.requireActual("next-router-mock"));

const mockUseQuery = jest.fn();

jest.mock("../../utils/api", () => {
  return {
    api: {
      repo: {
        search: {
          useQuery: () => mockUseQuery() as jest.Mock,
        },
      },
    },
  };
});

describe(ReposTable, () => {
  beforeEach(cleanup);

  it("renders no value when user has not entered a query", () => {
    render(<ReposTable />);

    expect(screen.queryByText("name")).not.toBeInTheDocument();
  });

  it("renders an error message when present", async () => {
    mockGetParam.mockReturnValue(() => "axion");

    mockUseQuery.mockReturnValue({
      error: {
        message: "Something went wrong!",
      },
      repos: {},
    });

    render(<ReposTable />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("renders a loading indicator when request is pending", () => {
    mockGetParam.mockReturnValue(() => "axion");

    mockUseQuery.mockReturnValue({
      isLoading: true,
      repos: {},
    });

    render(<ReposTable />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders a list of repos", () => {
    mockGetParam.mockReturnValue(() => "google");

    mockUseQuery.mockReturnValue({
      data: {
        repos: mockGoogleRepos,
      },
    });

    render(<ReposTable />);
    mockGoogleRepos.forEach(repo => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
    })
  });
});
