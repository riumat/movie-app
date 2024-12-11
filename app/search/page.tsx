import Background from "@/components/layout/background"
import Body from "@/components/search-section/body"
import { fetchQueryData } from "@/lib/fetchers"
import { getSession } from "@/lib/session"

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { page = "1", query = "" }: { [key: string]: string, } = await searchParams
  const { results, total_pages, users } = await fetchQueryData(query, page)
  const session = await getSession()

  return (
    
    <div className="flex-1 ">
      <Background />
      <div className="flex flex-col h-[93.5vh] items-center mt-[3.3rem]">
        <Body
          searchResults={results}
          users={users}
          session={session}
          results={results}
          totalPages={total_pages}
          page={Number(page)}
          query={query}
        />
      </div>
    </div>
  )
}

export default Page