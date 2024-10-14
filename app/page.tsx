import BackgroundDisplay from "@/components/BackgroundDisplay";
import Hero from "@/components/Hero";
import { fetchPopularMovies } from "@/utils/fetchers";

export default async function Home() {
  const movies = await fetchPopularMovies(0, 5);

  return (
    <>
      <BackgroundDisplay movies={movies} />
      <Hero />
    </>

  );
}