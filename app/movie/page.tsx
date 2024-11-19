import { fetchContentDataWithFilters, fetchTrendingPosters } from "@/lib/fetchers";
import Background from "@/components/layout/background";
import Body from "@/components/content/body";

const DiscoverPage = async () => {
  const posters = await fetchTrendingPosters(5, 10, "movie");
  const { genres, providers, content, yearRange, sortType } = await fetchContentDataWithFilters("movie");

  return (
    <div className="flex-1  min-h-screen">
      <Background
        posters={posters} />
      <div className="flex flex-col min-h-screen items-center mt-10">
        <Body
          initialContents={content}
          genres={genres}
          watchProviders={providers}
          yearRange={yearRange}
          sortType={sortType}
          media={"movie"}
        />
      </div>
    </div>
  );
}

export default DiscoverPage