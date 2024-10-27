import BackgroundDisplay from "@/components/BackgroundDisplay";
import Hero from "@/components/Hero";
import { fetchTrendingPosters } from "@/utils/fetchers";


export default async function Home() {
  const posters = await fetchTrendingPosters(0, 5, "movie");

  return (
    <>
      <BackgroundDisplay
        page="home"
        posters={posters} />
      <Hero />
    </>

  );
}