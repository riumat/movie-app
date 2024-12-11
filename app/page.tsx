import YouTubePlayer from "@/components/layout/bg-player";
import Body from "@/components/landing-page/body";
import { fetchTrending } from "@/lib/fetchers";

const Home = async () => {
  const { movies, tv, video } = await fetchTrending();
  return (
    <>
      <YouTubePlayer video={video} />
      <Body
        movies={movies}
        tv={tv}
      />
    </>

  );
}

export default Home;