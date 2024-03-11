import { z } from "zod";
import { ORG_FILTERS, SORT_DIRECTIONS, SORT_OPTIONS, USER_FILTERS } from "~/constants/repos";
import { getPageCount, parseLinkHeader } from "~/server/utils/parseLinkHeader";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { octokit } from "~/server/utils/oktokit";

type OrgFilter = typeof ORG_FILTERS[number]
type UserFilter = typeof USER_FILTERS[number]

export const repoRouter = createTRPCRouter({
    search: publicProcedure
        .input(z.object({ query: z.string(), sortBy: z.enum(SORT_OPTIONS).optional(), direction: z.enum(SORT_DIRECTIONS).optional(), type: z.string().optional(), page: z.number().gte(1).optional() }))
        .query(async ({ input }) => {
            const options = {
                sort: input.sortBy,
                direction: input.direction,
                page: input.page,
                per_page: 10,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            }

            const user = await octokit.request('GET /users/{username}', {
                username: input.query,
                headers: options.headers,
            })
            // tighten zod validation
            const orgType = input.type && ORG_FILTERS.includes(input.type as OrgFilter) ? input.type as OrgFilter : 'all'
            const userType = input.type && USER_FILTERS.includes(input.type as UserFilter) ? input.type as UserFilter : 'all'

            const isOrg = user.data.type?.toLowerCase() === "organization"
            const repos = isOrg ? await octokit.request('GET /orgs/{org}/repos', {
                org: input.query,
                type: orgType,
                ...options,
            }) : await octokit.request('GET /users/{username}/repos', {
                username: input.query,
                type: userType,
                ...options,
            })

            const {
                prev,
                next,
                last,
            } = parseLinkHeader(repos.headers.link)

            return {
                repos: repos.data,
                pagination: {
                    hasNextPage: !!next,
                    hasPrevPage: !!prev,
                    totalPages: getPageCount(last) ?? 1,
                    currentPage: input.page,
                    nextPage: getPageCount(next) ?? null,
                    prevPage: getPageCount(prev) ?? null
                }
            }
        }),
});
