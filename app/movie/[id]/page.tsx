import { notFound } from 'next/navigation';
import NameSection from '@/components/NameSection';
import { formatDate, formatMinutes } from '@/utils/functions';
import MediaHero from '@/components/MediaHero';
import { MovieData } from '@/utils/types';
import { fetchContentData } from '@/utils/fetchers';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  let movieData: MovieData;
  try {
    movieData = await fetchContentData(movieId, "movie");
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-20 w-full">
      <NameSection images={movieData.images.backdrops} contentData={movieData} />
      <div className='flex flex-col gap-5 w-full'>
        <div className='w-full flex justify-center'>
          <p className='font-bold'>{movieData.tagline}</p>
        </div>
        <div className='flex justify-evenly items-center '>
          <div className='flex gap-10'>
            <p>{formatDate(movieData.release_date)}</p>
            <p>{formatMinutes(movieData.runtime)}</p>
            <div>
              {movieData.genres.map((genre, index, array) => (
                <span key={genre.id} className="mr-2">
                  {genre.name}{index < array.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MediaHero movieData={movieData} />
    </div>
  );
}


