import Background from "@/components/layout/background"
import MultiGrid from "@/components/search-section/multi-grid"
import UserList from "@/components/search-section/user-list"
import { fetchQueryData } from "@/lib/fetchers"
import { getSession } from "@/lib/session"

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { page = "1", query = "" }: { [key: string]: string, } = await searchParams
  const { results, total_pages, users } = await fetchQueryData(query, page)
  const session = await getSession()

  return (
    <>
      <Background />
      <div className="relative flex-1">
        <div className=" flex mx-10 gap-5 h-[93.5vh] items-start mt-[3.3rem]">
          <UserList users={users} session={session} />
          <MultiGrid
            searchResults={results}
            totalPages={total_pages}
            currentPage={Number(page)}
            query={query}
          />
        </div>
      </div >
    </>
  )
}

export default Page