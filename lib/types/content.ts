export type ContentItem = {
  id: number,
  poster_path: string,
  media_type: string,
  title: string,
  name: string,
  type: string
}

export type Selection = "crew" | "cast" | "seasons" | "videos" | "similar";
