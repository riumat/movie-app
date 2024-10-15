import { baseUrl } from "@/utils/constants";

const apiKey = process.env.TMDB_API_KEY;


export async function getGenres() {
  const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  const data = await res.json();
  return data.genres;
}

export async function getWatchProviders() {
  const res = await fetch(`${baseUrl}/watch/providers/movie?api_key=${apiKey}&watch_region=IT`);
  const data = await res.json();
  return data.results;
}

export const fetchContentData = async (media: string) => {
  const [resGenres, resWatchProviders, resContent] = await Promise.all([
    fetch(`${baseUrl}/genre/${media}/list?api_key=${apiKey}`),
    fetch(`${baseUrl}/watch/providers/${media}?api_key=${apiKey}&watch_region=IT`),
    fetch(`${baseUrl}/discover/${media}?api_key=${apiKey}&page=1&sort_by=popularity.desc`)
  ]);
  const [genres, watchProviders, content] = await Promise.all([
    resGenres.json(),
    resWatchProviders.json(),
    resContent.json()
  ]);
  return { genres: genres.genres, providers: watchProviders.results, content: content.results };
}


export async function getDiscoverMovies() {
  const res = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=1&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
}

export const fetchPopularContent = async (index1: number, index2: number, media: string) => {
  try {
    const response = await fetch(`${baseUrl}/${media}/popular?api_key=${apiKey}`);
    const data = await response.json();
    return data.results.slice(index1, index2);
  } catch (error) {
    console.error('Error fetching popular content:', error);
    return [];
  }
};

export const getMovieData = async (movieId: string) => {
  const [movieRes, imagesRes, providersRes] = await Promise.all([
    fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos,recommendations,similar`),
    fetch(`${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`),
    fetch(`${baseUrl}/movie/${movieId}/watch/providers?api_key=${apiKey}`),
  ]);

  if (!movieRes.ok || !imagesRes.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const movieData = await movieRes.json();
  const imagesData = await imagesRes.json();
  const providersData = await providersRes.json();

  return { ...movieData, images: imagesData, providers: providersData };
}