import Background from "@/components/layout/background";
import Body from "@/components/content/body";
import { getSession } from "@/lib/session";
import { fetchFilteredContents, fetchGenresAndProviders } from "@/lib/fetchers";

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const media = "movie"
  const params: { [key: string]: string, } = await searchParams;
  const { genres, providers } = await fetchGenresAndProviders(media);
  const { totalPages } = await fetchFilteredContents(params, media);

  return (
    <div className="flex-1">
      <Background />
      <div className="flex flex-col h-[93.5vh] items-center mt-[3.3rem]">
        <Body
          totalPages={totalPages}
          genres={genres}
          providers={providers}
          media={media}
          params={params}
        />

      </div>
    </div>
  );
}

export default DiscoverPage