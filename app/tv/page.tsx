import Body from "@/components/content/body";
import { getGenresAndProviders } from "@/lib/fetchers/index";
import { FilterParams } from "@/lib/types/params.types";

const MEDIA = "tv"

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<FilterParams> }) => {
  const params = await searchParams;
  const { genres, providers } = await getGenresAndProviders(MEDIA);

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center mt-[4rem]">
        <Body
          media={MEDIA}
          params={params}
          genres={genres}
          providers={providers}
        />
      </div>
    </div>
  );
}

export default DiscoverPage