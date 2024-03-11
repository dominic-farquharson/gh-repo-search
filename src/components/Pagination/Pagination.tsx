import { SecondaryButton } from "../Button/Button";
import { useTableSearchParams } from "~/hooks/useTableSearchParams";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isLoading: boolean;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  isLoading,
  currentPage,
}) => {
  const { setSearchTerm} = useTableSearchParams()

  return (
    <div className="space-x-4">
      {hasPrevPage && (
        <SecondaryButton
          disabled={isLoading}
          onClick={() => {
            setSearchTerm('page', (currentPage - 1)?.toString())
          }}
        >
          Back
        </SecondaryButton>
      )}
      {hasNextPage && (
        <SecondaryButton
          onClick={() => {
            setSearchTerm('page', (currentPage + 1)?.toString())
          }}
          disabled={isLoading}
        >
          Next
        </SecondaryButton>
      )}
    </div>
  );
};
