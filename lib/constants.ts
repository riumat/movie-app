export const baseUrl = "https://api.themoviedb.org/3";
export const imageUrl = "https://image.tmdb.org/t/p";

export const imgWidth = {
  poster: {
    92: "/w92",
    154: "/w154",
    185: "/w185",
    342: "/w342",
    500: "/w500",
    780: "/w780",
    original: "/original"
  },
  backdrop: {
    300: "/w300",
    780: "/w780",
    1280: "/w1280",
    original: "/original"
  },
  profile: {
    45: "/w45",
    185: "/w185",
    632: "/h632",
    original: "/original"
  },
  logo: {
    45: "/w45",
    92: "/w92",
    154: "/w154",
    185: "/w185",
    300: "/w300",
    500: "/w500",
    original: "/original"
  }
}

export const placeholders = {
  profile: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  multi: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PlaceholderRoss.png/640px-PlaceholderRoss.png",
}

export const sidebarItems = [
  { label: 'Home', path: '/' },
  { label: 'Movies', path: '/movie' },
  { label: 'Tv Shows', path: '/tv' },
  { label: 'People', path: '/person' },
  { label: 'Genres', path: '/genres' },
];


export const relevantMovieJobs = [
  "Director",
  "Writer",
  "Screenplay",
  "Director of Photography",
  "Editor",
  "Original Music Composer",
  "Story",
  "Producer",
  "Visual Effects Supervisor",
  "Art Direction"
];

export const relevantTvJobs = [
  "Writer",
  "Tvplay",
  "Director of Photography",
  "Original Music Composer",
  "Story",
  "Producer"
];


export const selectorTvList = [
  {
    name: "Cast",
    value: "cast"
  },
  {
    name: "Crew ",
    value: "crew",
  },
  {
    name: "Seasons",
    value: "seasons",
  },
  {
    name: "Videos",
    value: "videos",
  },
  {
    name: "Similar",
    value: "similar",
  },
];

export const selectorMovieList = [
  {
    name: "Cast",
    value: "cast"
  },
  {
    name: "Crew ",
    value: "crew",
  },
  {
    name: "Videos",
    value: "videos",
  },
  {
    name: "Similar",
    value: "similar",
  },
]

export const genreIdsToExclude = new Set([
  99, // Documentary
  10767, // Talk show
  10764, // Reality
  10763, // News
  10762, // Game show
  10768, // Short
]);

export const externalUrls = {
  imdb: " https://www.imdb.com/name/",
  wikidata: "https://www.wikidata.org/wiki/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/channel/",
  tiktok: "https://www.tiktok.com/",
  tmdb: "https://www.themoviedb.org/person/"
}