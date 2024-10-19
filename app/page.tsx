import BackgroundDisplay from "@/components/BackgroundDisplay";
import Hero from "@/components/Hero";
import { fetchPopularContent } from "@/utils/fetchers";


export default async function Home() {
  const movies = await fetchPopularContent(0, 5, "movie");

  return (
    <>
      <BackgroundDisplay movies={movies} />
      <Hero />
    </>

  );
}