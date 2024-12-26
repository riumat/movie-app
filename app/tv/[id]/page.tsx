import { notFound } from 'next/navigation';
import { getGenericContentData } from '@/lib/fetchers/index';
import { getAverageEpisodeRuntime } from '@/lib/functions';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { imageUrl, imgWidth } from '@/lib/constants';
import RadialChart from '@/components/ui/radial-chart';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "tv"
  const movieData = await getGenericContentData(params.id, media)
    .catch(() => { notFound() })
    
  return (
    <div className='flex gap-2 justify-between mx-10 '>
      <div className='flex gap-5 items-center flex-[2] text-base'>
        <div className='w-52 h-72 relative' >
          <ImageWithLoader src={`${imageUrl}${imgWidth.poster[342]}${movieData.poster_path}`} />
        </div>
        <div className='grid grid-cols-2 gap-x-10 h-full py-3'>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light text-sm'>Original Title</p>
            <p className='font-bold'>{movieData.original_name}</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light text-sm'>Number Of Episodes</p>
            <p className='font-bold'>{movieData.number_of_episodes}</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light text-sm'>Created By</p>
            <div className='font-bold flex flex-col '>
              {movieData.created_by.map((person: any) => (
                <p key={person.name}>{person.name}</p>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light text-sm'>Production</p>
            <div className='font-bold flex flex-col '>
              {movieData.production_countries.map((country: any) => (
                <p key={country.name}>{country.name}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start '>
            <p className='font-light text-sm'>Spoken Languages</p>
            <div className='font-bold flex flex-col'>
              {movieData.spoken_languages.map((language: any) => (
                <p key={language.english_name}>{`${language.name} ${language.english_name === language.name ? "" : `(${language.english_name})`}`}</p>
              ))}
            </div>
          </div>



        </div>
      </div>



      <div className='flex-1 flex justify-center '>
        <RadialChart data={{ value: movieData.vote_average, total: movieData.vote_count }} />
      </div>
      {movieData.user && (
        <div className='flex-1 flex justify-center '>
          <p>Friends who watched it: {movieData.user.map((user: any) => user.username)}</p>
        </div>
      )}
    </div>
  );
}

export default MoviePage


