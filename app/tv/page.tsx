import BackgroundDisplay from "@/components/layout/background";
import FilterableDataList from "@/components/content/body";
import { fetchContentDataWithFilters, fetchTrendingPosters } from "@/lib/fetchers";

export default async function DiscoverPage() {
  const posters = await fetchTrendingPosters(5, 10, "tv");
  const { genres, providers, content } = await fetchContentDataWithFilters("tv");

  return (
    <div className="flex-1 min-h-screen">
      <BackgroundDisplay
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