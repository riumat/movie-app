import { getGenericContentData } from '@/lib/fetchers/index';
import SeasonsSection from '@/components/tv/seasons-section';
import { mediaType } from '@/lib/constants';

const TvSeasonSection = async ({ params }: { params: { id: string } }) => {
  const creditsData = await getGenericContentData(params.id, mediaType.tv, [])
  return (
    <SeasonsSection seasons={creditsData.seasons} />
  );
}

export default TvSeasonSection


