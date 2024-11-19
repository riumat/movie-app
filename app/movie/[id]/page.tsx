import { notFound } from 'next/navigation';
import { MovieData } from '@/lib/types';
import { fetchContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import Body from '@/components/movie/body';
import ContentHeader from '@/components/content/content-header';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const movieData: MovieData = await fetchContentData(id, "movie")
    .catch(() => { notFound() })

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <ContentBackground
        poster={movieData.images.backdrops[0].file_path}
      />
      <ContentHeader
        contentData={movieData}
      />
      <Body
        movieData={movieData}
      />
    </div>
  );
}

export default MoviePage

