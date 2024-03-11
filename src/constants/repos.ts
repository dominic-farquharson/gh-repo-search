export const SORT_OPTIONS = ["created", "updated", "pushed", "full_name"] as const;

export const SORT_DIRECTIONS = ["asc", "desc"] as const;

// maps to type field
export const USER_FILTERS = [
  'all',
  'owner',
  'member'
] as const;

//  omitted private filter to exclude ones attached to my PAT
export const ORG_FILTERS = [
  'all', 'public',
  'forks', 'sources', 'member'
] as const;
