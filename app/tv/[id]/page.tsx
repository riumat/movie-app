import { notFound } from 'next/navigation';
import { getGenericContentData } from '@/lib/fetchers/index';
import { formatDate } from '@/lib/functions';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { imageUrl, imgWidth, mediaType, posterRatio } from '@/lib/constants';
import RadialChart from '@/components/ui/radial-chart';
import { Badge } from '@/components/ui/badge';

const TvPage = async ({ params }: { params: { id: string } }) => {
  const movieData = await getGenericContentData(params.id, mediaType.tv, [])
    .catch(() => { notFound() })

  return (
    <div className='flex flex-col lg:flex-row gap-20 md:gap-3  justify-between mx-10 '>
      <div className='w-52  rounded-lg ' >
        <ImageWithLoader src={`${imageUrl}${imgWidth.poster[342]}${movieData.poster_path}`} ratio={posterRatio} />
      </div>
      <div className='flex items-center flex-1   p-3 rounded-lg'>

        <div className='flex-1 grid grid-cols-2 mx-3 gap-10 text-sm flex-wrap'>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Original Title</p>
            <p className='font-bold'>{movieData.original_name}</p>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Number of episodes</p>
            <p className='font-bold'>{movieData.number_of_episodes}</p>
          </div>
          <div className='flex flex-col  items-start'>
            <p className='font-light text-sm'>Created By</p>
            <div className='font-bold flex flex-col '>
              {movieData.created_by.map((person: any) => (
                <p key={person.name}>{person.name}</p>
              ))}
            </div>
          </div>

          <div className='flex flex-col  items-start'>
            <p className='font-light text-sm'>Production</p>
            <div className='font-bold flex flex-col '>
              {movieData.production_countries.map((country: any) => (
                <p key={country.name}>{country.name}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light text-sm'>Spoken Languages</p>
            <div className='font-bold flex flex-col'>
              {movieData.spoken_languages.map((language: any) => (
                <p key={language.english_name}>{`${language.name} ${language.english_name === language.name ? "" : `(${language.english_name})`}`}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col  items-start '>
            <p className='font-light '>Status</p>
            <p className=' font-semibold'>{movieData.status}</p>
          </div>


        </div>
      </div>



      <div className='flex flex-col gap-3  '>
        <div className='flex flex-col lg:items-center justify-center gap-5  bg-secondary/40 py-3 px-10 rounded-lg '>
          {movieData.next_episode_to_air ? (
            <div className='flex flex-col items-center text-sm'>
              <div className='flex items-center text-sm gap-1'>
                <p>Next episode:</p>
                <p className=''>{movieData.next_episode_to_air.name}</p>
              </div>

              <Badge variant={"default"}>{formatDate(movieData.next_episode_to_air.air_date)}</Badge>
            </div>
          ) : (
            <div className='flex flex-col items-center text-sm'>
              <p className='font-light'>Last episode</p>
              <p className='font-medium'>{movieData.last_episode_to_air.name}</p>
              <p>{formatDate(movieData.last_episode_to_air.air_date)}</p>
            </div>
          )}

        </div>
        <div className='bg-secondary/40 rounded-lg px-7'>
          <RadialChart data={{ value: movieData.vote_average, total: movieData.vote_count }} />
        </div>
      </div>

    </div>
  );
}

export default TvPage


