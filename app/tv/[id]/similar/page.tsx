import { notFound } from 'next/navigation';
import { MovieData } from '@/lib/types/movie';
import { getContentData, getSimilarContentData } from '@/lib/fetchers/index';
import CreditsList from '@/components/people/credits-list';
import SimilarContentSection from '@/components/content/similar-content-section';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "movie"
  const similarContent = await getSimilarContentData(params.id, media)
    .catch(() => { notFound() })
    console.log(similarContent)
  return (
    <SimilarContentSection movieData={similarContent} />
  );
}

export default MoviePage


