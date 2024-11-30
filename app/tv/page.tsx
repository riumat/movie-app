import { checkUserContent, fetchContentDataWithFilters, fetchGenres, fetchProviders, fetchTrendingPosters } from "@/lib/fetchers";
import Background from "@/components/layout/background";
import Body from "@/components/content/body";
import { getSession } from "@/lib/session";

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const media = "tv"
  const session = await getSession();
  const params: { [key: string]: string, } = await searchParams;
  const posters = await fetchTrendingPosters(5, 10, media);
  const genres = await fetchGenres(media);
  const providers = await fetchProviders(media);
  const contentData = await fetchContentDataWithFilters(params, media);
  const userData = await checkUserContent(session, contentData.content, media);

  return (
    <div className="flex-1">
      <Background
        posters={posters} />
      <div className="flex flex-col h-[93.5vh] items-center mt-[3.3rem]">
        <Body
          contentData={contentData}
          genres={genres}
          providers={providers}
          media={media}
          userData={userData}
        />
      </div>
    </div>
  );
}

export default DiscoverPage