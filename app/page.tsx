import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

export default async function Home() {
  const bearerToken = process.env.TMDB_BEARER;

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Accept: 'application/json',
        },
      });
      return response.data.results.slice(0, 5);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  };

  const movies = await fetchPopularMovies();

  return (
    <Hero movies={movies} />
  );
}