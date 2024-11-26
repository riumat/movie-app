export type PersonData = {
  biography: string,
  birthday: string,
  deathday: string,
  id: number,
  imdb_id: string,
  name: string,
  place_of_birth: string,
  profile_path: string,
  known_for_department: string,
  images: {
    profiles: {
      file_path: string
    }[]
  }
  combined_credits: {
    backdrop_path: string,
    id: number,
    title: string,
    release_date: string,
    media_type: string,
    poster_path: string,
    popularity: number,
    genre_ids: number[],
    character: string,
    episode_count: number,
    vote_average: number,
    vote_count: number,
    order: number
  }[],
  external_ids: {
    id: number,
    facebook_id?: string,
    instagram_id?: string,
    twitter_id?: string,
    wikidata_id?: string,
    tiktok_id?: string,
    youtube_id?: string,
    imdb_id?: string,
  }
  cast_credits: {
    id: number,
    title: string,
    name: string,
    release_date: string,
    media_type: string,
    character: string,
    episode_count: number,
    vote_average: number,
    vote_count: number,
    order: number
  }[],
  crew_credits: {
    id: number,
    title: string,
    name: string,
    release_date: string,
    media_type: string,
    job: string
  }[]
}

export type PeopleResult = {
  id: number,
  name: string,
  profile_path: string,
  media_type: string,
  known_for_department: string,
  gender: number,
}