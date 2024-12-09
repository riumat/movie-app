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

export type ContentReview = {
  id: number,
  title: string,
  name: string,
  release_date: string,
  first_air_date: string,
  review: string,
  type:"movie" | "tv",
}

export type ContentRated={
  id: number,
  title: string,
  name: string,
  release_date: string,
  first_air_date: string,
  rating: number,
  type: "movie" | "tv",
}
