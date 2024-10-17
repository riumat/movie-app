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

export interface ContentItem{
  id: number,
  poster_path: string,
  media_type: string,
}

export interface ProviderItem {
  logo_path: string,
  provider_name: string,
  provider_id: number,
  display_priority: number,
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
    results: {
      key: string,
      name: string,
      type: string,
      official: boolean,
    }[],
  },
  recommendations: {
    page: number,
    total_pages: number,
    total_results: number,
    results: MovieItem[],
  }
  providers: {
    results: {
      IT: ProviderData,
    },
  },
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
  aggregate_credits: {
    cast: TvCastItem[],
    crew: TvCrewItem[],
  },
  videos: {
    results: {
      key: string,
      name: string,
      type: string,
      official: boolean,
    }[],
  },
  recommendations: {
    page: number,
    total_pages: number,
    total_results: number,
    results: TvItem[],
  }
  providers: {
    results: {
      IT: ProviderData,
    },
  },
  images: ImagesItem
}

/* export interface GenericData {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  media_type: string,
} */

/* export interface CrewMember {
  job?: string;
  character?: string;
  name: string;
  id: number;
  profile_path: string;
} */
/* export interface WorkMember {
  job: string;
  name: string;
  id: number;
  profile_path: string;
} */

/* export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
} */

/* export interface CrewFormatted {
  job?: string[];
  character?: string;
  name: string;
  id: number;
  profile_path: string;
} */


