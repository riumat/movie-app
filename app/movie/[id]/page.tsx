
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getMovie(movieId: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch movie data');
  }

  return res.json();
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  let movie;

  try {
    movie = await getMovie(movieId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <p className="text-lg mb-4">{movie.overview}</p>
          <h2 className="text-2xl font-semibold mb-2">Cast</h2>
          <ul className="list-disc list-inside">
            {movie.credits.cast.slice(0, 5).map((actor: { id: number; name: string }) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
