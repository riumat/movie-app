import { notFound } from 'next/navigation';
import Image from 'next/image';
import { baseUrl } from '@/utils/constants';
import NameSection from '@/components/NameSection';

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
  },
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
  status: string,
  credits: {
    cast: {
      id: number,
      name: string,
    }[],
    crew: {}[],
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

}

async function getMovieData(movieId: string) {
  const [movieRes, imagesRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,recomendations,similar`),
    fetch(`${baseUrl}/movie/${movieId}/images?api_key=${process.env.TMDB_API_KEY}`)
  ]);

  if (!movieRes.ok || !imagesRes.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const movieData = await movieRes.json();
  const imagesData = await imagesRes.json();

  return { ...movieData, images: imagesData };
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
    <div className="container mx-auto px-4 py-8">
      <NameSection images={movieData.images.backdrops} movieData={movieData} logo={movieData.images.logos} />
      <div className="md:w-2/3 md:pl-8">
        <p className="text-lg mb-4">{movieData.overview}</p>
        <h2 className="text-2xl font-semibold mb-2">Cast</h2>
        <ul className="list-disc list-inside">
          {movieData.credits.cast.slice(0, 5).map((actor: { id: number; name: string }) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
