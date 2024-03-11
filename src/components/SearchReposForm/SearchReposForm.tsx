import React, { useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
import { useTableSearchParams } from "~/hooks/useTableSearchParams";

export const SearchReposForm: React.FC = () => {
  const [error, setError] = useState("");
  const { query, clearSearchTerms, setSearchTerm } = useTableSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (error) setError("");
        const query = new FormData(e.currentTarget).get("query") as string;
        if (!query) {
          setError("Please enter a value");
          return;
        }
        setSearchTerm("query", query);
      }}
      className="container flex items-center space-x-2"
    >
      <input
        defaultValue={query}
        placeholder="Enter a Github username or organization"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
        name="query"
        required
        ref={inputRef}
      />
      {!!query && (
        <SecondaryButton
          type="button"
          onClick={() => {
            clearSearchTerms();
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          Clear
        </SecondaryButton>
      )}
      <PrimaryButton type="submit">Search</PrimaryButton>
      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </form>
  );
};
