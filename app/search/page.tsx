import Background from "@/components/layout/background"
import Body from "@/components/search-section/body"
import { getSearchResults } from "@/lib/fetchers/index"

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { page = "1", query = "" }: { [key: string]: string, } = await searchParams
  const { contents } = await getSearchResults(query, page)

  return (

    <div className="flex-1 ">
      <Background />
      <div className="flex flex-col h-[93.5vh] items-center mt-[3.3rem]">
        <Body
          results={contents.results}
          totalPages={contents.total_pages}
          page={Number(page)}
          query={query}
        />
      </div>
    </div>
  )
}

export default Page