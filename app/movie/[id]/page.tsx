import { notFound } from 'next/navigation';
import { baseUrl } from '@/utils/constants';
import NameSection from '@/components/NameSection';
import CastCarousel from '@/components/CastCarousel';
import ProviderSection from '@/components/ProvidersSection';
import { formatDate, formatMinutes } from '@/utils/functions';
import CrewSection from '@/components/CrewSection';
import MediaHero from '@/components/MediaHero';
import { MovieData } from '@/utils/types';


async function getMovieData(movieId: string) {
  const [movieRes, imagesRes, providersRes] = await Promise.all([
    fetch(`${baseUrl}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,recomendations,similar`),
    fetch(`${baseUrl}/movie/${movieId}/images?api_key=${process.env.TMDB_API_KEY}`),
    fetch(`${baseUrl}/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`),
  ]);

  if (!movieRes.ok || !imagesRes.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const movieData = await movieRes.json();
  const imagesData = await imagesRes.json();
  const providersData = await providersRes.json();

  return { ...movieData, images: imagesData, providers: providersData };
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  let movieData: MovieData;

  try {
    movieData = await getMovieData(movieId);
    //console.log(movieData)
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-20 w-full">
      <NameSection images={movieData.images.backdrops} movieData={movieData} logo={movieData.images.logos} />
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


