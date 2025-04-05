import { notFound } from 'next/navigation';
import { getGenericContentData } from '@/lib/fetchers/index';
import { formatDate } from '@/lib/functions';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { imageUrl, imgWidth, mediaType, posterRatio } from '@/lib/constants';
import RadialChart from '@/components/ui/radial-chart';
import { Badge } from '@/components/ui/badge';

const TvPage = async ({ params }: { params: { id: string } }) => {
  const tvData = await getGenericContentData(params.id, mediaType.tv, [])
    .catch(() => { notFound() })

  return (
    <div className='flex flex-col lg:flex-row gap-20 md:gap-x-3 gap-y-10  items-center justify-between mx-10 flex-wrap '>

      <div className='flex items-center flex-auto p-3 rounded-lg'>

        <div className='flex flex-col gap-5'>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Original Title</p>
            <p className='font-bold'>{tvData.original_name}</p>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Number of episodes</p>
            <p className='font-bold'>{tvData.number_of_episodes}</p>
          </div>
          <div className='flex flex-col  items-start'>
            <p className='font-light text-sm'>Created By</p>
            <div className='font-bold flex flex-col '>
              {tvData.created_by.map((person: any) => (
                <p key={person.name}>{person.name}</p>
              ))}
            </div>
          </div>

          <div className='flex flex-col  items-start'>
            <p className='font-light text-sm'>Production</p>
            <div className='font-bold flex flex-col '>
              {tvData.production_countries.map((country: any) => (
                <p key={country.name}>{country.name}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Spoken Languages</p>
            <div className='font-bold flex flex-col'>
              {tvData.spoken_languages.map((language: any) => (
                <p key={language.english_name}>{`${language.name} ${language.english_name === language.name ? "" : `(${language.english_name})`}`}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light '>Status</p>
            <p className=' font-semibold'>{tvData.status}</p>
          </div>


        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='w-0 md:w-56 lg:w-64 rounded-lg' >
          <ImageWithLoader src={`${imageUrl}${imgWidth.poster[342]}${tvData.poster_path}`} ratio={posterRatio} />
        </div>

        <div className='flex flex-col gap-3 w-full md:w-64 items-center '>
          <div className='flex flex-col lg:items-center justify-center gap-5  bg-secondary/40 py-3 w-full rounded-lg '>
            {tvData.next_episode_to_air ? (
              <div className='flex flex-col items-center text-sm gap-1'>
                <div className='flex items-center text-sm gap-1'>
                  <p>Next episode:</p>
                  <p className=''>{tvData.next_episode_to_air.name}</p>
                </div>

                <Badge variant={"default"}>{formatDate(tvData.next_episode_to_air.air_date)}</Badge>
              </div>
            ) : (
              <div className='flex flex-col items-center text-sm gap-1'>
                <div className='flex items-center text-sm gap-1'>
                  <p className='font-light'>Last episode</p>
                  <p className='font-medium'>{tvData.last_episode_to_air.name}</p>
                </div>

                <Badge variant={"default"}>{formatDate(tvData.last_episode_to_air.air_date)}</Badge>
              </div>
            )}

          </div>
          <div className='bg-secondary/40 rounded-lg px-7 justify-center w-64 md:w-56 lg:w-64 md:flex-1 '>
            <RadialChart data={{ value: tvData.vote_average, total: tvData.vote_count }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvPage


