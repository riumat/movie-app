import Body from "@/components/content/body";
import { mediaType } from "@/lib/constants";
import { getGenresAndProviders } from "@/lib/fetchers/index";
import { FilterParams } from "@/lib/types/params.types";


const DiscoverPage = async ({ searchParams }: { searchParams: Promise<FilterParams> }) => {
  const params = await searchParams;
  const { genres, providers } = await getGenresAndProviders(mediaType.movie);

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center mt-[4rem]">
        <Body
          media={mediaType.movie}
          params={params}
          genres={genres}
          providers={providers}
        />
      </div>
    </div>
  );
}

export default DiscoverPage