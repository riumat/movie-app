import Body from "@/components/landing-page/body";
import BackgroundPlayer from "@/components/layout/bg-player";
import { fetchTrending } from "@/lib/fetchers";
import { getSession } from "@/lib/session";

const Home = async () => {
  const sessionData = getSession();
  const trendingData = fetchTrending();
  const [session, { movies, tv, video }] = await Promise.all([sessionData, trendingData]);
  return (
    <>
      <BackgroundPlayer video={video} />
      <Body
        movies={movies}
        tv={tv}
        isLogged={!!session}
      />
    </>

  );
}

export default Home;