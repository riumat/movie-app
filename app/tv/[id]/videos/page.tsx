import { notFound } from 'next/navigation';
import { getContentVideosData } from '@/lib/fetchers/index';
import VideoSection from '@/components/content/video-section';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "tv"
  const videosData = await getContentVideosData(params.id, media)
    .catch(() => { notFound() })
  return (
    <VideoSection videoInfo={videosData} />
  );
}

export default MoviePage


