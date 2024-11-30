import { CastItem } from "@/lib/types/cast"
import { CrewItem } from "@/lib/types/crew"
import { ImagesItem } from "@/lib/types/image"
import { ProviderItem } from "@/lib/types/provider"
import { VideoItem } from "@/lib/types/video"

export type MovieData = {
  type: "movie",
  media_type: string,
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
  recommendations: MovieData[],
  providers: ProviderItem[],
}

export type MovieResult = {
  backdrop_path: string,
  id: number,
  media_type: string,
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