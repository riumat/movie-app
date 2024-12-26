import Background from "@/components/layout/background";
import Body from "@/components/content/body";

const DiscoverPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const media = "tv"
  const params: { [key: string]: string, } = await searchParams;

  return (
    <div className="flex-1">
      <Background />
      <div className="flex flex-col h-[93.5vh] items-center mt-[3.3rem]">
        <Body
          media={media}
          params={params}
        />
      </div>
    </div>
  );
}

export default DiscoverPage