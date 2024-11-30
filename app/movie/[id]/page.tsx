import { notFound } from 'next/navigation';
import { checkUserContent, fetchContentData, fetchUserContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import Body from '@/components/movie/body';
import ContentHeader from '@/components/content/content-header';
import { MovieData } from '@/lib/types/movie';
import { getSession } from '@/lib/session';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "movie"
  const session = await getSession();
  const userData = await fetchUserContentData(params.id, media)
  const movieData: MovieData = await fetchContentData(params.id, media)
    .catch(() => { notFound() })
  const similarData: any = await checkUserContent(session, movieData.recommendations, media);

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
        similarData={similarData}
      />
    </div>
  );
}

export default MoviePage


