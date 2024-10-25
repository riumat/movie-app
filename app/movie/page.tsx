import { fetchBackgrundPosters, fetchContentDataWithFilters } from "@/utils/fetchers";
import BackgroundDisplay from "@/components/BackgroundDisplay";
import FilterableDataList from "@/components/FilterableMovieList";

export default async function DiscoverPage() {
  const posters = await fetchBackgrundPosters(5, 10, "movie");
  const { genres, providers, content } = await fetchContentDataWithFilters("movie");

  return (
    <div className="flex-1 relative min-h-screen">
      <BackgroundDisplay posters={posters} />
      <div className="flex flex-col min-h-screen items-center mt-10">
        <FilterableDataList
          initialContents={content}
          genres={genres}
          watchProviders={providers}
          media={"movie"}
        />
      </div>
    </div>
  );
}