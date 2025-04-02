import { Content } from "@/lib/types/content.types";

export type TvData = Content<TvData> & {
  media_type: "tv";
  name: string;
  created_by: {
    id: number;
    name: string;
    profile_path: string;
  }[];
  first_air_date: string;
  last_air_date: string;
  genre_ids: number[];
  in_production: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
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