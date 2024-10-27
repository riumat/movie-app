import { fetchContentDataWithFilters, fetchTrendingPosters } from "@/utils/fetchers";
import BackgroundDisplay from "@/components/BackgroundDisplay";
import FilterableDataList from "@/components/FilterableMovieList";

export default async function DiscoverPage() {
  const posters = await fetchTrendingPosters(5, 10, "tv");
  const { genres, providers, content } = await fetchContentDataWithFilters("tv");

  return (
    <div className="flex-1 min-h-screen">
      <BackgroundDisplay
        page="home"
        posters={posters} />
      <div className="flex flex-col min-h-screen items-center mt-10">
        <FilterableDataList
          initialContents={content}
          genres={genres}
          watchProviders={providers}
          media="tv"
        />
      </div>
    </div>
  );
}