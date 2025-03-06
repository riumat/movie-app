import Background from "@/components/layout/background";
import Body from "@/components/content/body";
import { FilterParams } from "@/lib/types/params.types";

const MEDIA = "movie"

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<FilterParams> }) => {
  const params = await searchParams;

  return (
    <div className="flex-1">
     
      <div className="flex flex-col items-center mt-[3.3rem]">
        <Body
          media={MEDIA}
          params={params}
        />
      </div>
    </div>
  );
}

export default DiscoverPage