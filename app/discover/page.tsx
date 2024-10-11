import { baseUrl } from "@/utils/constants";
import DropdownMenu from "@/components/DropdownMenu";

export default async function DiscoverPage() {
  const genres = await getGenres();
  const watchProviders = await getWatchProviders();
  const movieData = await getDiscoverMovies();

  return (
    <div className="flex-1 flex flex-col items-center gap-20 w-full">
      <h1 className="text-2xl font-bold mb-4">Discover</h1>
      <div className="space-y-4 flex gap-6">
        <DropdownMenu title="Genres" items={genres.map((genre: any) => ({ id: genre.id, name: genre.name }))} />
        <DropdownMenu
          title="Watch Providers"
          items={watchProviders
            .filter((provider: any) => provider.display_priority < 20)
            .map((provider: any) => ({ id: provider.provider_id, name: provider.provider_name }))}
        />
      </div>
    </div>
  );
}

export async function getGenres() {
  const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
  const data = await res.json();
  return data.genres;
}

export async function getWatchProviders() {
  const res = await fetch(`${baseUrl}/watch/providers/movie?api_key=${process.env.TMDB_API_KEY}&watch_region=IT`);
  const data = await res.json();
  return data.results;
}

export async function getDiscoverMovies() {
  const res = await fetch(`${baseUrl}/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=1&sort_by=popularity.desc`);
  const data = await res.json();
  return data;
}