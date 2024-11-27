import { notFound } from 'next/navigation';
import { fetchContentData, fetchUserContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import Body from '@/components/movie/body';
import ContentHeader from '@/components/content/content-header';
import { MovieData } from '@/lib/types/movie';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchUserContentData(params.id, "movie")
  const movieData: MovieData = await fetchContentData(params.id, "movie")
    .catch(() => { notFound() })

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <ContentBackground
        poster={movieData.images.backdrops[0]?.file_path}
      />
      <ContentHeader
        contentData={movieData}
        userData={userData}
      />
      <Body
        movieData={movieData}
      />
    </div>
  );
}

export default MoviePage


