export type ContentItem = {
  id: number,
  poster_path: string,
  backdrop_path: string,
  media_type: string,
  title: string,
  name: string,
  type: string
}

export type Selection = "crew" | "cast" | "seasons" | "videos" | "similar";

export type ContentUserData = {
  watched: boolean,
  watchlisted: boolean,
  rating: number | null,
  review: string | null,
  userId: number,
}
