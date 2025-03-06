"server-only"

import { tmdbConfig } from "@/lib/fetchers/axios.config";
import { endpoint } from "@/lib/fetchers/endpoints";
import { ApiGenreResponse, ApiItemResponse, ApiListResponse } from "@/lib/types/api.types";
import { MediaType } from "@/lib/types/content.types";
import { MovieData } from "@/lib/types/movie.types";
import { FilterParams } from "@/lib/types/params.types";
import { PersonResult } from "@/lib/types/person.types";
import { ProviderItem } from "@/lib/types/provider.types";
import { TvData } from "@/lib/types/tv.types";

const MOVIE_RELEASE_DATE = 'primary_release_date';
const TV_RELEASE_DATE = 'first_air_date';
const MOVIE = 'movie';
const TV = 'tv';

export const getTmdbGenresAndProviders = async (media: string) => {
  const [genresData, providersData] = await Promise.all([
    tmdbConfig().get<ApiGenreResponse>(endpoint.genre.all(media)),
    tmdbConfig().get<ApiListResponse<ProviderItem>>(endpoint.watchProviders.all(media), { params: { watch_region: 'IT' } })
  ]);
  return {
    genres: genresData.data.genres,
    providers: providersData.data.results
  };
};

export const getTmdbFilteredContent = async (params: FilterParams, media: MediaType) => {
  const release = media === MOVIE ? MOVIE_RELEASE_DATE : TV_RELEASE_DATE;

  const data = (await tmdbConfig().get<ApiListResponse<MovieData | TvData>>(endpoint.discover.all(media), {
    params: {
      page: params.page.toString(),
      with_watch_providers: params.providers,
      with_genres: params.genres,
      [`${release}.gte`]: `${params.from}-01-01`,
      [`${release}.lte`]: `${params.to}-12-31`,
      sort_by: params.sort,
      without_genres: '10763,10764,10767',
      'vote_count.gte': '200',
      watch_region: 'IT'
    }
  })).data;
  return data;
}

type PersonResponse = {
  personData: any;
  creditsData: any;
  imagesData: any;
  externalData: any;
}

export const getTmdbPersonData = async (id: string) => {
  try {
    const [personRes, creditsRes, imagesRes, externalRes] = await Promise.all([
      tmdbConfig().get(endpoint.person.all(id)),
      tmdbConfig().get(endpoint.person.credits(id)),
      tmdbConfig().get(endpoint.person.images(id)),
      tmdbConfig().get(endpoint.person.external(id))
    ]);

    return {
      personData: personRes.data,
      creditsData: creditsRes.data,
      imagesData: imagesRes.data,
      externalData: externalRes.data
    };
  } catch (error) {
    throw new Error(`Failed to fetch person data: ${error}`);
  }
}

type ContentResponse = {
  contentData: any;
  imagesData: any;
  providersData: any;
  creditsData: any;
}

export const getTmdbGenericContentData = async (id: string, media: string) => {
  try {
    return (await tmdbConfig().get(endpoint.dynamicContent.all(media, id))).data;
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}
export const getTmdbHeaderData = async (id: string, media: string) => {
  try {
    const [contentRes, providersRes, imagesRes] = await Promise.all([
      tmdbConfig().get(endpoint.dynamicContent.all(media, id)),
      tmdbConfig().get(endpoint.dynamicContent.providers(media, id), { params: { watch_region: 'IT' } }),
      tmdbConfig().get(endpoint.dynamicContent.images(media, id))
    ]);
    const contentData = contentRes.data;
    const providersData = providersRes.data;
    const imagesData = imagesRes.data

    return {
      ...contentData,
      providers: providersData.results?.IT?.flatrate ?? [],
      images: imagesData
    };
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}

export const getTmdbCreditsData = async (id: string, media: string) => {
  const creditsUrl = media === "movie" ? "credits" : "aggregate_credits";
  try {
    return (await tmdbConfig().get(endpoint.dynamicContent.credits(media, id, creditsUrl))).data;
  } catch (error) {
    throw new Error(`Failed to fetch credits data: ${error}`);
  }
}

export const getTmdbVideosData = async (id: string, media: string) => {
  try {
    return (await tmdbConfig().get(endpoint.dynamicContent.videos(media, id))).data;
  } catch (error) {
    throw new Error(`Failed to fetch videos data: ${error}`);
  }
}

export const getTmdbRecommendationsData = async (id: string, media: string) => {
  try {
    return (await tmdbConfig().get(endpoint.dynamicContent.recommendations(media, id))).data;
  } catch (error) {
    throw new Error(`Failed to fetch recommendations data: ${error}`);
  }

}

export const getTmdbContentData = async (contentId: string, media: string): Promise<ContentResponse> => {
  try {
    const creditsType = media === "movie" ? "credits" : "aggregate_credits";
    const [contentRes, imagesRes, providersRes, creditsRes] = await Promise.all([
      tmdbConfig().get(endpoint.dynamicContent.all(media, contentId), { params: { append_to_response: 'videos,recommendations' } }),
      tmdbConfig().get(endpoint.dynamicContent.images(media, contentId)),
      tmdbConfig().get(endpoint.dynamicContent.providers(media, contentId), { params: { watch_region: 'IT' } }),
      tmdbConfig().get(endpoint.dynamicContent.credits(media, contentId, creditsType)),
    ]);

    return {
      contentData: contentRes.data,
      imagesData: imagesRes.data,
      providersData: providersRes.data,
      creditsData: creditsRes.data
    };
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}

export const getTmdbSearchResults = async (query: string, page: string) => {
  type T = MovieData | TvData | PersonResult;
  try {
    const data = (await tmdbConfig().get<ApiListResponse<T>>(endpoint.search.multi, { params: { query, page } })).data;
    const typed = data.results.map((result) => {
      if (result.media_type === 'movie') {
        return result as MovieData;
      } else if (result.media_type === 'tv') {
        return result as TvData;
      } else {
        return result as PersonResult;
      }
    });

    return {
      page: page,
      total_pages: data.total_pages!,
      results: typed
    };
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error}`);
  }
}

export const getTmdbLandingContent = async () => {
  const [trendingMovies, trendingTv] = await Promise.all([
    tmdbConfig().get<ApiListResponse<MovieData>>(endpoint.trending.movies),
    tmdbConfig().get<ApiListResponse<TvData>>(endpoint.trending.tv)
  ]);

  const movies = trendingMovies.data.results;
  const tv = trendingTv.data.results;

  const trendingMovie = (await tmdbConfig().get<MovieData>(endpoint.dynamicContent.all(MOVIE, movies[0].id.toString()))).data;
  console.log(trendingMovie);

  return {
    movies,
    tv,
    video: {
      title: trendingMovie.title,
      id: trendingMovie.id,
      poster: trendingMovie.backdrop_path,
      release: trendingMovie.release_date,
      runtime: trendingMovie.runtime,
      genres: trendingMovie.genres
    }
  }
}