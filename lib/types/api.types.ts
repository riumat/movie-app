import { GenreItem } from "@/lib/types/genre.types";

export interface ApiListResponse<T> {
  results: T[];
  pages?: number;
  total_results?: number;
  total_pages?: number;
  id?: number;
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface ApiGenreResponse {
  genres: GenreItem[];
}
