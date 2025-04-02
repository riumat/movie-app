import { Content } from "@/lib/types/content.types"
import { ImagesItem } from "@/lib/types/image"

export type MovieData = Content<MovieData> & {
  media_type: "movie";
  title: string;
  images: ImagesItem;
  budget: number;
  genre_ids: number[];
  homepage: string;
  release_date: string;
  revenue: number;
  runtime: number;
}

export type MovieResult = {
  backdrop_path: string,
  id: number,
  media_type: "movie",
  overview: string,
  poster_path: string,
  title: string
  release_date: string
  vote_average: number,
  vote_count: number,
  genre_ids: number[],
  original_title: string,
}

export type MovieItem = {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  media_type: string,
}