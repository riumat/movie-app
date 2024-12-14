import YouTubePlayer from "@/components/layout/bg-player";
import Body from "@/components/landing-page/body";
import { fetchTrending } from "@/lib/fetchers";
import { getSession } from "@/lib/session";

const Home = async () => {
  const session = await getSession();
  const { movies, tv, video } = await fetchTrending();
  return (
    <>
      <YouTubePlayer video={video} />
      <Body
        movies={movies}
        tv={tv}
        session={session}
      />
    </>

  );
}

export default Home;