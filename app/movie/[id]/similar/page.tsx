import { getSimilarContentData } from '@/lib/fetchers/index';
import SimilarContentSection from '@/components/content/similar-content-section';
import { mediaType } from '@/lib/constants';

const MovieSimilarSection = async ({ params }: { params: { id: string } }) => {
  const { recommendations } = await getSimilarContentData(params.id, mediaType.movie)

  return (
    <SimilarContentSection contents={recommendations} />
  );
}

export default MovieSimilarSection


