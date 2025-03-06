import Body from "@/components/landing-page/body";
import BackgroundPlayer from "@/components/layout/bg-player";
import { getLandingPageData } from "@/lib/fetchers/index";

const Home = async () => {
  const trendingData = await getLandingPageData();
  return (
    <div className=" flex flex-col">
      <BackgroundPlayer video={trendingData.video} />
      <Body
        movies={trendingData.movies}
        tv={trendingData.tv}
      />
    </div>

  );
}

export default Home