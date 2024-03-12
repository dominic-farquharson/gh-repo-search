import { SearchReposForm } from "./SearchReposForm";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

const mockGetParam = jest.fn();
const mockSetSearchParam = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: () => mockGetParam() as jest.Mock,
    set: () => mockSetSearchParam() as jest.Mock,
  }),
}));
jest.mock("next/router", (): jest.Mock => jest.requireActual("next-router-mock"));

const setup = () => render(<SearchReposForm />)

describe(SearchReposForm, () => {
  beforeEach(jest.clearAllMocks)

  it('renders a clear button when user has entered a query', async () => {
    setup()
    expect(screen.queryByText(/clear/i)).not.toBeInTheDocument()

    await act(async () => {
      await mockRouter.push('/?query=google')
    })

    cleanup()
    mockGetParam.mockReturnValue(() => "axion");
    setup()
    
    expect(screen.queryByText(/clear/i)).toBeInTheDocument()
  })

  it('renders a form to search for repos', async () => {
    await act(async () => {
      await mockRouter.push('/')
    })
    setup()
    const input = screen.getByPlaceholderText('Enter a Github username or organization')

    expect(input).toBeInTheDocument()
    
    expect(mockRouter.asPath).toEqual('/')

    await userEvent.type(input, 'google')
    await userEvent.click(screen.getByText('Search'))
    
    expect(mockRouter.asPath).toEqual('/?query=google')
  })
});
