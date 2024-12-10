export type ProfileData = {
  id: number,
  name: string,
  since: Date,
  watched: {
    user_id: number,
    content_id: number,
    content_type: "movie" | "tv",
    rating: number | null,
    review: string | null,
    created_at: Date,
  }[],
  following: {
    person_id: number,
    user_id: number,
  }[],
  watchlist: {}[],
  genres: {
    id: number,
    name: string,
    count: number
  }[],
  watchtime: number,
  rated: number,
  reviewed: number,
  friends: any[],
  friendStatus: string
  requests: {
    requester_id: number,
    requester_name:string,
    receiver_id: number,
    receiver_name: string,
    status: string
  }[]
}