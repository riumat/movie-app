import { notFound } from 'next/navigation';
import { PersonData } from '@/utils/types';
import { fetchPersonData } from '@/utils/fetchers';
import NamePersonSection from '@/components/NamePersonSection';
import SliderComponent from '@/components/SliderContent';

//use case, activity diagram, sequence, r schema db


export default async function MoviePage({ params }: { params: { id: string } }) {
  const personId = params.id;
  let personData: PersonData;
  try {
    personData = await fetchPersonData(personId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <NamePersonSection images={personData.combined_credits[0].backdrop_path} personData={personData} />

      {personData.combined_credits.length > 0 && (
        <div className='mt-10 flex flex-col w-[90%] '>
          <p className='font-bold text-xl'>Known for:</p>
          <SliderComponent
            contentList={personData.combined_credits} />
        </div>
      )}

    </div>
  )
}

