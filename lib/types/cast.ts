export type CastItem = {
  id: number,
  name: string,
  character: string,
  profile_path: string,
}

export type TvCastItem = {
  id: number,
  name: string,
  roles: {
    character: string
  }[],
  profile_path: string,
}

