import { getContentCreditData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';
import { mediaType } from '@/lib/constants';

const TvCrewSection = async ({ params }: { params: { id: string } }) => {
  const creditsData = await getContentCreditData(params.id, mediaType.tv)
  return (
    <CreditsList personList={creditsData.crew} />
  );
}

export default TvCrewSection


