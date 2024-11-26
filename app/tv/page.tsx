import { fetchContentDataWithFilters, fetchGenres, fetchProviders, fetchTrendingPosters } from "@/lib/fetchers";
import Background from "@/components/layout/background";
import Body from "@/components/content/body";

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const media="tv"
  const params: { [key: string]: string, } = await searchParams;
  const posters = await fetchTrendingPosters(5, 10, media);
  const genres = await fetchGenres(media);
  const providers = await fetchProviders(media);
  const contentData = await fetchContentDataWithFilters(params, media);

  return (
    <div className="flex-1 min-h-screen">
      <Background
        posters={posters} />
      <div className="flex flex-col min-h-screen items-center mt-[4rem]">
        <Body
          contentData={contentData}
          genres={genres}
          providers={providers}
          media={media}
        />
      </div>
    </div>
  );
}

export default DiscoverPage