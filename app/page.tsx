import Background from "@/components/layout/background";
import YouTubePlayer from "@/components/layout/bg-player";
import Body from "@/components/search-section/body";
import { fetchTrending, fetchTrendingPosters } from "@/lib/fetchers";

const Home = async () => {
  const posters = await fetchTrendingPosters(0, 5, "movie");
  const { movies, tv, video } = await fetchTrending();
  console.log(video)
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