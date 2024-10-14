import { fetchLists, fetchPopularMovies } from "@/utils/fetchers";
import BackgroundDisplay from "@/components/BackgroundDisplay";
import FilterableMovieList from "@/components/FilterableMovieList";

export default async function DiscoverPage() {
  const movies = await fetchPopularMovies(5, 10);
  const { genres, watchProviders, discoverMovies } = await fetchLists();

  return (
    <div className="flex-1 relative min-h-screen">
      <BackgroundDisplay movies={movies} />
      <div className="flex flex-col min-h-screen items-center mt-10">
        <FilterableMovieList
          initialMovies={discoverMovies}
          genres={genres}
          watchProviders={watchProviders}
        />
      </div>
    </div>
  );
}