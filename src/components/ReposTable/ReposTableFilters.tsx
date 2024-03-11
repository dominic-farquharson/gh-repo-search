import React from "react";
import {
  SORT_OPTIONS,
  SORT_DIRECTIONS,
  ORG_FILTERS,
  USER_FILTERS,
} from "~/constants/repos";
import { Select } from "../Select/Select";
import { useTableSearchParams } from "~/hooks/useTableSearchParams";

export const ReposeTableFilters: React.FC<{
  isOrg: boolean;
  loading: boolean;
}> = ({ isOrg, loading }) => {
  const { direction, filter, query, sortBy, setSearchTerm } =
    useTableSearchParams();
  const filters = isOrg ? ORG_FILTERS : USER_FILTERS;
  if (loading) return;

  return (
    <div className="flex space-x-4">
      <Select
        defaultValue={sortBy}
        onChange={(e) => {
          setSearchTerm("sortBy", e.target.value);
        }}
      >
        <option value="">Sort by</option>
        {SORT_OPTIONS.map((sortOption) => {
          return (
            <option value={sortOption} key={sortOption}>
              {sortOption}
            </option>
          );
        })}
      </Select>
      <Select
        defaultValue={direction}
        onChange={(e) => {
          setSearchTerm("direction", e.target.value);
        }}
      >
        <option value="">Direction</option>
        {SORT_DIRECTIONS.map((direction) => {
          return (
            <option value={direction} key={direction}>
              {direction}
            </option>
          );
        })}
      </Select>
      <Select
        defaultValue={filter}
        onChange={(e) => {
          setSearchTerm("filter", e.target.value);
        }}
        disabled={!query}
      >
        <option value="">Filter</option>
        {filters.map((filter) => {
          return (
            <option value={filter} key={filter}>
              {filter}
            </option>
          );
        })}
      </Select>
    </div>
  );
};
