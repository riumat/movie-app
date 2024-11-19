export type CrewItem = {
  id: number,
  name: string,
  job: string,
  profile_path: string,
}

export type TvCrewItem = {
  id: number,
  name: string,
  jobs: {
    job: string
  }[],
  profile_path: string,
}