
const TRENDING = "/trending";
const MOVIE = "/movie";
const SEARCH = "/search";
const PERSON = "/person";
const DISCOVER = "/discover";
const GENRE = "/genre";
const WATCH_PROVIDERS = "/watch/providers";

export const endpoint = {
  trending: {
    movies: `${TRENDING}/movie/week`,
    tv: `${TRENDING}/tv/week`,
  },
  movie: {
    videos: (id: number) => `${MOVIE}/${id}/videos`,
  },
  search: {
    multi: `${SEARCH}/multi`,
  },
  dynamicContent: {
    all: (type: string, id: string) => `/${type}/${id}`,
    allWithAppend: (type: string, id: string, append: string[]) => `/${type}/${id}?append_to_response=${append.join(',')}`,
    images: (type: string, id: string) => `/${type}/${id}/images`,
    providers: (type: string, id: string) => `/${type}/${id}/watch/providers`,
    credits: (type: string, id: string, creditType: string) => `/${type}/${id}/${creditType}`,
    recommendations: (type: string, id: string) => `/${type}/${id}/recommendations`,
    videos: (type: string, id: string) => `/${type}/${id}/videos`,
  },
  person: {
    all: (id: string) => `${PERSON}/${id}`,
    images: (id: string) => `${PERSON}/${id}/images`,
    credits: (id: string) => `${PERSON}/${id}/combined_credits`,
    external: (id: string) => `${PERSON}/${id}/external_ids`,
  },
  discover: {
    all: (type: string) => `${DISCOVER}/${type}`,
  },
  genre: {
    all: (type: string) => `${GENRE}/${type}/list`,
  },
  watchProviders: {
    all: (type: string) => `${WATCH_PROVIDERS}/${type}`,
  },

}