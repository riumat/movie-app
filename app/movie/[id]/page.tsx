import { notFound } from 'next/navigation';
import Image from 'next/image';
import { baseUrl, imageUrl } from '@/utils/constants';
import NameSection from '@/components/NameSection';
import NameCard from '@/components/NameCard';
import CastCarousel from '@/components/CastCarousel';
import ProviderSection from '@/components/ProvidersSection';
import { formatDate, formatMinutes } from '@/utils/functions';
import CrewSection from '@/components/CrewSection';

interface MovieData {
  id: number,
  title: string,
  images: {
    backdrops: {
      file_path: string,
    }[],
    logos: {
      iso_639_1: string,
      file_path: string,
    }[]
  },
  budget: number,
  genres: {
    id: number,
    name: string,
  }[],
  homepage: string,
  overview: string,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
  }[],
  release_date: string,
  revenue: number,
  runtime: number,
  tagline: string,
  status: string,
  credits: {
    cast: {
      id: number,
      name: string,
      character: string,
      profile_path: string,
    }[],
    crew: {
      id: number,
      name: string,
      job: string,
      profile_path: string,
    }[],
  },
  videos: {
    results: {}[],
  },
  similar: {
    page: number,
    total_pages: number,
    total_results: number,
    results: {}[],
  },
  providers: {
    results: {
      IT: {
        link: string,
        flatrate: {
          provider_id: number,
          provider_name: string,
          logo_path: string,
          display_priority: number,
        }[],
      },
    },
  }
}

async function getMovieData(movieId: string) {
  const [movieRes, imagesRes, providersRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,recomendations,similar`),
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
    console.log(movieData)
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-5">
      <NameSection images={movieData.images.backdrops} movieData={movieData} logo={movieData.images.logos} />
      <div className='w-full flex mt-3 justify-center'>
        <p className='font-bold'>{movieData.tagline}</p>
      </div>

      <div className='flex justify-evenly w-full'>

        <CrewSection crew={movieData.credits.crew} />

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

      <ProviderSection providers={movieData.providers.results.IT?.flatrate} />
      <div className="flex flex-col pt-6">
        <h2 className="text-2xl font-semibold mb-2">Cast</h2>
        <CastCarousel cast={movieData.credits.cast} />
      </div>
    </div>
  );
}


