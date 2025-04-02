import { getContentVideosData } from '@/lib/fetchers/index';
import VideoSection from '@/components/content/video-section';
import { mediaType } from '@/lib/constants';

const MovieVideoSection = async ({ params }: { params: { id: string } }) => {
  const videosData = await getContentVideosData(params.id, mediaType.movie)

  return (
    <VideoSection videoInfo={videosData} />
  );
}

export default MovieVideoSection


