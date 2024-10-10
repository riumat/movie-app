export interface MovieData {
  id: number,
  title: string,
  images: {
    posters: {
      file_path: string,
    }[],
    backdrops: {
      file_path: string,
    }[],
    logos: {
      iso_639_1: string,
      file_path: string,
    }[]
  },
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
    cast: {
      id: number,
      name: string,
      character: string,
      profile_path: string,
    }[],
    crew: {
      id: number,
      name: string,
      job: string,
      profile_path: string,
    }[],
  },
  videos: {
    results: {
      key: string,
      name: string,
      type:string,
      official: boolean,
    }[],
  },
  similar: {
    page: number,
    total_pages: number,
    total_results: number,
    results: {
      id: number,
      title: string,
      poster_path: string,
      release_date: string,
      vote_average: number,
      media_type: string,
    }[],
  },
  recommendations: {
    page: number,
    total_pages: number,
    total_results: number,
    results: {
      id: number,
      title: string,
      poster_path: string,
      release_date: string,
      vote_average: number,
      media_type: string,
    }[],
  }
  providers: {
    results: {
      IT: ProviderData,
    },
  },
}


export interface CrewMember {
  job?: string;
  character?: string;
  name: string;
  id: number;
  profile_path: string;
}

export interface CrewFormatted {
  job?: string[];
  character?: string;
  name: string;
  id: number;
  profile_path: string;
}

export interface Provider {
  logo_path: string,
  provider_name: string,
  provider_id: number,
  display_priority: number,
}

export interface ProviderData {
  link: string,
  flatrate: Provider[],
  rent: Provider[],
  buy: Provider[]
}
