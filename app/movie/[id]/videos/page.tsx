import { notFound } from 'next/navigation';
import { MovieData } from '@/lib/types/movie';
import { getContentData, getContentVideosData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';
import VideoSection from '@/components/content/video-section';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "movie"
  const videosData = await getContentVideosData(params.id, media)
    .catch(() => { notFound() })
  return (
    <VideoSection videoInfo={videosData} />
  );
}

export default MoviePage


