import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface TableSearchParams {
  query: string
  sortBy: string
  direction: string
  filter: string
  page: number
  clearSearchTerms: () => void
  setSearchTerm: (key: string, value: string) => void
}

export const useTableSearchParams = (): TableSearchParams => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "";
  const direction = searchParams.get("direction") ?? "";
  const filter = searchParams.get("filter") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const clearSearchTerms = () => {
    void router.push('/')
  }

  const setSearchTerm = (key: string, value: string) => {
    if (!value) return
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    void router.push(url);
  }

  return {
    query,
    sortBy,
    direction,
    filter,
    page,
    clearSearchTerms,
    setSearchTerm
  }
}