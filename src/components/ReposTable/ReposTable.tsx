import {
  SORT_DIRECTIONS,
  SORT_OPTIONS,
} from "~/constants/repos";
import { api } from "~/utils/api";
import { ReposeTableFilters } from "./ReposTableFilters";
import { Pagination } from "../Pagination/Pagination";
import { useTableSearchParams } from "~/hooks/useTableSearchParams";

const fields = [
  "name",
  "stargazers_count",
  "language",
  "created_at",
  "html_url",
] as const;

export const ReposTable: React.FC = () => {
  const { direction, filter, page, query, sortBy } = useTableSearchParams();
  const repos = api.repo.search.useQuery(
    {
      query,
      sortBy: SORT_OPTIONS.find((option) => option === sortBy),
      direction: SORT_DIRECTIONS.find((option) => option === direction),
      page: Number(page),
      type: filter,
    },
    {
      enabled: !!query,
      refetchOnMount: false,
    },
  );
  const isOrg =
    repos?.data?.repos?.[0]?.owner?.type?.toLowerCase() === "organization";

  if (!query) {
    return;
  }
  if (repos.error?.message) {
    return <p>{repos.error.message}</p>;
  }

  if (repos.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex grow-0 items-center justify-between">
        <ReposeTableFilters isOrg={isOrg} loading={repos.isLoading} />
        {!!repos.data?.pagination && (
          <Pagination
            hasNextPage={repos.data.pagination.hasNextPage}
            hasPrevPage={repos.data.pagination.hasPrevPage}
            currentPage={repos.data.pagination.currentPage ?? 1}
            isLoading={repos.isLoading}
          />
        )}
      </div>
      <table className="mt-4 w-full text-left text-sm text-gray-600 dark:text-gray-500">
        <thead className="text-md bg-gray-50 uppercase text-gray-700 dark:bg-gray-600 dark:text-gray-500">
          <tr className="text-center dark:border-gray-700">
            {fields.map((field) => (
              <th className="px-6 py-3" key={field}>
                {field.replace(/_/, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repos.data?.repos?.map((repo) => {
            return (
              <tr key={repo.id}>
                {fields.map((field) => {
                  let value = repo[field] ?? "";
                  if (field === "created_at")
                    value = new Date(value).toLocaleDateString();
                  return (
                    <td className="px-6 py-3" key={field}>
                      {field === "html_url" ? (
                        <a className="hover:underline" href={value?.toString()} target="_blank">
                          link
                        </a>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!repos?.data?.repos?.length && (
        <p className="my-4">No results matched your query.</p>
      )}
    </div>
  );
};
