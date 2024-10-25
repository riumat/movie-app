import BackgroundDisplay from "@/components/BackgroundDisplay";
import Hero from "@/components/Hero";
import { fetchBackgrundPosters } from "@/utils/fetchers";


export default async function Home() {
  const posters = await fetchBackgrundPosters(0, 5, "movie");

  return (
    <>
      <BackgroundDisplay posters={posters} />
      <Hero />
    </>

  );
}