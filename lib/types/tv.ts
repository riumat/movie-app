import { CastItem } from "@/lib/types/cast";
import { CrewItem } from "@/lib/types/crew";
import { ImagesItem } from "@/lib/types/image";
import { ProviderItem } from "@/lib/types/provider";
import { VideoItem } from "@/lib/types/video";

export type TvData = {
  type: "tv";
  media_type: string,
  overview: string;
  created_by: {
    id: number;
    name: string;
    profile_path: string;
  }[];
  first_air_date: string;
  last_air_date: string;
  genre_ids: number[],
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
  number_of_seasons: number;
  poster_path: string;
  backdrop_path: string;
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
    cast: CastItem[],
    crew: CrewItem[],
  },
  videos: {
    trailers: VideoItem[],
    clips: VideoItem[],
    feat: VideoItem[],
  },
  recommendations: TvData[],
  providers: ProviderItem[],
  images: ImagesItem,
  watched: boolean,
  watchlisted: boolean,
  user: any,
}

export interface TvItem {
  id: number,
  name: string,
  poster_path: string,
  first_air_date: string,
  vote_average: number,
  media_type: string,
}

export interface TvResult {
  backdrop_path: string,
  id: number,
  media_type: "tv",
  overview: string,
  poster_path: string,
  name: string
  first_air_date: string
  vote_average: number,
  vote_count: number,
  genre_ids: number[],
  original_name: string
}