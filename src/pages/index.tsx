import Head from "next/head";
import { ReposTable } from "~/components/ReposTable/ReposTable";
import { SearchReposForm } from "~/components/SearchReposForm/SearchReposForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>GH Repo Search</title>
        <meta name="description" content="Search GH repos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-8 flex min-h-screen flex-col items-center text-black">
        <div className="container flex flex-col space-y-4">
          <h1 className="text-3xl">GH Repos Search</h1>
          <SearchReposForm />
          <ReposTable />
        </div>
      </main>
    </>
  );
}
