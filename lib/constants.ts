import { IoHomeOutline } from "react-icons/io5";

import { FaFilm } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

export const baseUrl = "https://api.themoviedb.org/3";
export const imageUrl = "https://image.tmdb.org/t/p";
export const youtubeUrl = "https://www.youtube.com/watch?v=";

export const backdropRatio=16/9;
export const posterRatio=2/3;

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
  { label: 'Home', path: '/', icon: IoHomeOutline },
  { label: 'Movies', path: '/movie', icon: FaFilm },
  { label: 'Tv Shows', path: '/tv', icon: FaTv },
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
    name: "Overview",
    value: ""
  },
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
    name: "Overview",
    value: ""
  },
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

export const tmdbMovieGenres = {
  28: "Azione",
  12: "Avventura",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  99: "Documentario",
  18: "Dramma",
  10751: "Famiglia",
  14: "Fantasy",
  36: "Storia",
  27: "Horror",
  10402: "Musica",
  9648: "Mistero",
  10749: "Romantico",
  878: "Fantascienza",
  10770: "Film TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Western"
};

export const tmdbTvGenres = {
  10759: "Action & Adventure",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  99: "Documentario",
  18: "Dramma",
  10751: "Famiglia",
  10762: "Kids",
  9648: "Mistero",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "Guerra & Politica",
  37: "Western"
};

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

export const twGenresStyle = [
  "font-bold text-4xl ",
  "font-base text-lg ",
  "font-base text-lg ",
  "font-light text-base ",
  "font-light text-base ",
]

export const boxOfficeResults = [
  { value: "Flop", color: "red-800" },
  { value: "Average", color: "yellow-800" },
  { value: "Success", color: "blue-800" },
  { value: "Blockbuster", color: "green-800" }
]

