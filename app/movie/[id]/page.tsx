import { notFound } from 'next/navigation';
import NameSection from '@/components/NameSection';
import MediaHero from '@/components/MediaHero';
import { MovieData } from '@/utils/types';
import { fetchContentData } from '@/utils/fetchers';
import BackgroundDisplay from '@/components/BackgroundDisplay';

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
    <div className="flex-1 flex flex-col items-center w-full ">
      <div className='bg-gradient-to-b from-neutral-950/10 to-neutral-950/90 h-screen w-full -z-20 absolute' />
      <BackgroundDisplay
        page="content"
        posters={movieData.images.backdrops
          .slice(0, 1)
          .map((image) => image.file_path)}
      />
      <NameSection
        contentData={movieData}
      />
      <MediaHero
        movieData={movieData}
      />
    </div>
  );
}


