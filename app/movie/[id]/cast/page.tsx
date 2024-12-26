import { notFound } from 'next/navigation';
import { getContentCreditData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "movie"
  const creditsData = await getContentCreditData(params.id, media)
    .catch(() => { notFound() })
  return (
    <CreditsList personList={creditsData.cast} />
  );
}

export default MoviePage


