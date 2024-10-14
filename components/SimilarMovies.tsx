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
  recommendations: MovieType[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ recommendations }) => {
  return (

    <div className=" h-full ">
      {recommendations.length > 0 && (
        <div className='flex flex-col gap-4 items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
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
