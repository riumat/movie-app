import { notFound } from 'next/navigation';
import { getContentCreditData, getGenericContentData } from '@/lib/fetchers/index';
import SeasonsSection from '@/components/tv/seasons-section';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "tv"
  const creditsData = await getGenericContentData(params.id, media,[])
    .catch(() => { notFound() })
  return (
    <SeasonsSection seasons={creditsData.seasons} />
  );
}

export default MoviePage


