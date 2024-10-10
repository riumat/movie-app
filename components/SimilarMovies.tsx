import React from 'react';
import { MovieData } from '@/utils/types';
import MultiCard from '@/components/MultiCard';
import MovieCard from '@/components/MovieCard';

interface MovieType {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  media_type: string,
}

interface SimilarMoviesProps {
  similar: MovieType[];
  recommendations: MovieType[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ similar, recommendations }) => {
  return (

    <div className="flex gap-8 justify-evenly items-center h-full">
      {similar.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <h2 className="text-xl font-semibold mb-4">Similar Movies</h2>
          <div className="flex flex-col gap-4 ">
            {similar.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
          <div className="flex flex-col gap-4 ">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SimilarMovies;
