import { fetchContentDataWithFilters, fetchGenres, fetchProviders, fetchTrendingPosters } from "@/lib/fetchers";
import Background from "@/components/layout/background";
import Body from "@/components/content/body";

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const media = "movie";
  const params: { [key: string]: string, } = await searchParams;
  const posters = await fetchTrendingPosters(5, 10, media);
  const genres = await fetchGenres(media);
  const providers = await fetchProviders(media);
  const contentData = await fetchContentDataWithFilters(params, media);

  return (
    <div className="flex-1 ">
      <Background
        posters={posters} />
      <div className="flex flex-col h-[90vh] items-center mt-[3.5rem]">
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