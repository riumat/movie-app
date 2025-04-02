import { getContentCreditData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';
import { mediaType } from '@/lib/constants';


const MovieCrewSection = async ({ params }: { params: { id: string } }) => {
  const creditsData = await getContentCreditData(params.id, mediaType.movie)

  return (
    <CreditsList personList={creditsData.crew} />
  );
}

export default MovieCrewSection


