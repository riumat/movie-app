import { EpisodeData } from "@/lib/types/episode";

export type SeasonData = {
  id: number;
  air_date: string;
  name: string;
  season_number: number;
  poster_path: string;
  overview: string;
  episodes: EpisodeData[]
}