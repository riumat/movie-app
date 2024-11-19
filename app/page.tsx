import Background from "@/components/layout/background";
import Body from "@/components/search-section/body";
import { fetchTrendingPosters } from "@/lib/fetchers";

const Home = async () => {
  const posters = await fetchTrendingPosters(0, 5, "movie");

  return (
    <>
      <Background
        posters={posters} />
      <Body />
    </>

  );
}

export default Home;