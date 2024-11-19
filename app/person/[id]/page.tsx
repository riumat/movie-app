import { notFound } from 'next/navigation';
import { PersonData } from '@/lib/types';
import { fetchPersonData } from '@/lib/fetchers';
import PersonHeader from '@/components/people/person-header';
import KnownForSection from '@/components/people/known-section';

//use case, activity diagram, sequence, r schema db

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const personId = params.id;
  const personData: PersonData = await fetchPersonData(personId)
    .catch(() => notFound())

  return (
    <div className="flex-1 flex flex-col items-center w-full pb-12">
      <PersonHeader personData={personData} />
    </div>
  )
}

export default PersonPage
