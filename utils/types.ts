export interface ImagesItem {
  posters: {
    file_path: string,
  }[],
  backdrops: {
    file_path: string,
  }[]
}

export interface CastItem {
  id: number,
  name: string,
  character: string,
  profile_path: string,
}

export interface TvCastItem {
  id: number,
  name: string,
  roles: {
    character: string
  }[],
  profile_path: string,
}

export interface CrewItem {
  id: number,
  name: string,
  job: string,
  profile_path: string,
}

export interface TvCrewItem {
  id: number,
  name: string,
  jobs: {
    job: string
  }[],
  profile_path: string,
}

export interface MovieItem {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  media_type: string,
}

export interface TvItem {
  id: number,
  name: string,
  poster_path: string,
  first_air_date: string,
  vote_average: number,
  media_type: string,
}

export interface ContentItem {
  id: number,
  poster_path: string,
  media_type: string,
}

export interface ProviderItem {
  logo_path: string,
  provider_name: string,
  provider_id: number,
  display_priority: number,
  category: string
}

export interface VideoItem {
  key: string,
  name: string,
  type: string,
  official: boolean,
}


export interface ProviderData {
  link: string,
  flatrate: ProviderItem[],
  rent: ProviderItem[],
  buy: ProviderItem[],
  ads: ProviderItem[],
  free: ProviderItem[],
  tvod: ProviderItem[],
}

export interface MovieData {
  type: "movie",
  id: number,
  title: string,
  images: ImagesItem,
  budget: number,
  genres: {
    id: number,
    name: string,
  }[],
  homepage: string,
  overview: string,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
  }[],
  release_date: string,
  revenue: number,
  runtime: number,
  tagline: string,
  status: string,
  credits: {
    cast: CastItem[],
    crew: CrewItem[],
  }
  videos: {
    trailers: VideoItem[],
    clips: VideoItem[],
    feat: VideoItem[],
  },
  recommendations: {
    page: number,
    total_pages: number,
    total_results: number,
    results: MovieItem[],
  }
  providers: ProviderItem[],
}

export interface TvData {
  type: "tv";
  created_by: {
    id: number;
    name: string;
    profile_path: string;
  }[];
  first_air_date: string;
  last_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  in_production: boolean;
  name: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  poster_path: string;
  seasons: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
  }[];
  status: string;
  tagline: string;
  credits: {
    cast: TvCastItem[],
    crew: TvCrewItem[],
  },
  videos: {
    trailers: VideoItem[],
    clips: VideoItem[],
    feat: VideoItem[],
  },
  recommendations: {
    page: number,
    total_pages: number,
    total_results: number,
    results: TvItem[],
  }
  providers: ProviderItem[],
  images: ImagesItem
}

export interface PersonData {
  biography: string,
  birthday: string,
  deathday: string,
  id: number,
  imdb_id: string,
  name: string,
  place_of_birth: string,
  profile_path: string,
  known_for_department: string,
  images: {
    profiles: {
      file_path: string
    }[]
  }
  combined_credits: {
    backdrop_path: string,
    id: number,
    title: string,
    release_date: string,
    media_type: string,
    poster_path: string,
    popularity: number,
    genre_ids: number[],
    character: string,
    episode_count: number,
    vote_average: number,
    vote_count: number,
    order: number
  }[]
}

export interface SeasonData {
  id: number;
  air_date: string;
  name: string;
  season_number: number;
  poster_path: string;
  overview: string;
  episodes: EpisodeData[]
}
export interface EpisodeData {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  still_path: string;
}

export type Selection = "crew" | "cast" | "overview" | "seasons" | "watch" | "videos" | "similar";





