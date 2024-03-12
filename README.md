# GH Repos Search

Next.js app that allows you to search for the repositories owned by a user or an organization. Results are paginated and a user can filter and sort the responses. 

Basic styling was done using Tailwind, API was built using TRPC, and GH API data was fetched using octokit.

![image](https://github.com/dominic-farquharson/gh-repo-search/assets/22961764/b7d76315-f920-4bcd-8f37-e3e754382e66)


## Setup
1. install latest version of node 18
1. Run `cp .env.example .env` to create a local .env file
  1. Create a PAT on GH and add to the .env file

## Installation
1. Run `npm i`
1. Run `npm run dev`

## Technologies Used:
1. Next.js
1. T3 boilerplate (typescript, tailwind, trpc)
1. Zod
1. Octokit

## Future Improvements
- cache user/org check response. 
  - This is fetched each time the user makes a request which is redundant during pagination.
- Improve Zod validation during repo search
- Switch to dedicated form library
- Switch to FE styling library built on top of Tailwind or another option such as MUI.
- Improve FE validation and return better error messages to user.
- Move all string values (error messages, etc) to external constant.

## Deployment
[link](https://gh-repo-search-sepia.vercel.app/)

*Note: PAT expires in 7 days.*