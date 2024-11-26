import Background from "@/components/layout/background"
import MultiGrid from "@/components/search-section/multi-grid"
import { fetchQueryData, fetchTrendingPosters } from "@/lib/fetchers"

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { page = "1", query = "" }: { [key: string]: string, } = await searchParams
  const { results, total_pages } = await fetchQueryData(query.toString(), page.toString())
  const posters = await fetchTrendingPosters(0, 5, "movie");
  console.log(results)

  return (
    <>
      <Background
        posters={posters} />
      <div className="relative flex-1">
        <div className="relative h-full z-10 flex flex-col items-center mt-10">

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