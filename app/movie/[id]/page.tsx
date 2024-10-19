import { notFound } from 'next/navigation';
import NameSection from '@/components/NameSection';
import MediaHero from '@/components/MediaHero';
import { MovieData } from '@/utils/types';
import { fetchContentData } from '@/utils/fetchers';


export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieId = params.id;
  let movieData: MovieData;
  try {
    movieData = await fetchContentData(movieId, "movie");
    movieData.type = "movie";
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <NameSection images={movieData.images.backdrops} contentData={movieData} />
      <MediaHero movieData={movieData} />
    </div>
  );
}


