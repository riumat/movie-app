import { notFound } from 'next/navigation';
import PersonHeader from '@/components/people/person-header';
import KnownForSection from '@/components/people/known-section';
import { PersonData } from '@/lib/types/person.types';
import PastWorks from '@/components/people/past-works';
import { Separator } from '@/components/ui/separator';
import { getPersonData } from '@/lib/fetchers/index';

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const personData: PersonData = await getPersonData(params.id)
    .catch(() => notFound())
  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full gap-10 lg:gap-0 lg:justify-between lg:overflow-hidden pb-12 mt-16">
      <div className='flex flex-col flex-1 gap-5 lg:gap-2 lg:justify-between items-center mx-5 '>
        <PersonHeader personData={personData} />
        <Separator />
        <KnownForSection contents={personData.combined_credits} />
      </div>
      <Separator orientation="vertical" className='shrink-0 hidden lg:block' />
      <PastWorks personData={personData} />
    </div>
  )
}

export default PersonPage
