import { notFound } from 'next/navigation';
import { fetchPersonData, fetchUserPersonData } from '@/lib/fetchers';
import PersonHeader from '@/components/people/person-header';
import KnownForSection from '@/components/people/known-section';
import { PersonData } from '@/lib/types/people';
import PastWorks from '@/components/people/past-works';
import { Separator } from '@/components/ui/separator';


const PersonPage = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchUserPersonData(params.id)
  const personData: PersonData = await fetchPersonData(params.id)
    .catch(() => notFound())

  return (
    <div className="flex-1 flex  w-full justify-between overflow-hidden pb-12 mt-16">
      <div className='flex flex-col flex-1 gap-2 justify-between items-center ml-5'>
        <PersonHeader personData={personData} userData={userData} />
        <Separator className='w-full' />
        <KnownForSection contents={personData.combined_credits} />
      </div>
      <Separator orientation="vertical" className='h-full' />
      <PastWorks personData={personData} />
    </div>
  )
}

export default PersonPage
