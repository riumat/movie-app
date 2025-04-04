import { CastItem } from "@/lib/types/cast";
import { CrewItem } from "@/lib/types/crew";
import { MovieData } from "@/lib/types/movie.types";
import { ProviderItem } from "@/lib/types/provider.types";
import { TvData } from "@/lib/types/tv.types";
import { VideoItem } from "@/lib/types/video.types";

export type ContentType = "movie" | "tv";

export type DynamicContentType<T> = T extends "movie" ? MovieData : TvData;

export interface Content<T> {
  id: number;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  poster_path: string;
  backdrop_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
  }[];
  tagline: string;
  status: string;
  credits: {
    cast: CastItem[];
    crew: CrewItem[];
  };
  videos: {
    trailers: VideoItem[];
    clips: VideoItem[];
    feat: VideoItem[];
  };
  recommendations: T[];
  providers: ProviderItem[];
  vote_average: number;
  vote_count: number;
  watched: boolean;
  watchlisted: boolean;
  user: {
    watched: boolean,
    watchlisted: boolean,
  };
  external_ids: {
    facebook_id?: string,
    instagram_id?: string,
    twitter_id?: string,
    tiktok_id?: string,
    imdb_id?: string,
    wikidata_id?: string,
    youtube_id?: string,
  }
}