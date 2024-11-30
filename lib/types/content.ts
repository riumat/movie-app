export type ContentItem = {
  id: number,
  poster_path: string,
  media_type: string,
  title: string,
  name: string,
}

export type Selection = "crew" | "cast" | "overview" | "seasons" | "watch" | "videos" | "similar";
