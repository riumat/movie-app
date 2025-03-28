import { getContentCreditData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';
import { mediaType } from '@/lib/constants';


const MovieCastSection = async ({ params }: { params: { id: string } }) => {
  const creditsData = await getContentCreditData(params.id, mediaType.movie)

  return (
    <CreditsList personList={creditsData.cast} />
  );
}

export default MovieCastSection


