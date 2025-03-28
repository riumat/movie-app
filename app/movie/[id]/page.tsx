import { getGenericContentData } from '@/lib/fetchers/index';
import { formatMinutes } from '@/lib/functions';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { imageUrl, imgWidth, mediaType, posterRatio } from '@/lib/constants';
import RadialChart from '@/components/ui/radial-chart';

const MovieOverviewSection = async ({ params }: { params: { id: string } }) => {
  const movieData = await getGenericContentData(params.id, mediaType.movie, ["credits"])
  //const boxOfficeData = boxOfficeResults[rateMovieFinance(movieData.budget, movieData.revenue, movieData.release_date)]

  return (
    <div className='flex flex-col lg:flex-row gap-20 md:gap-3  justify-between mx-10 '>
      <div className='w-56  rounded-lg ' >
        <ImageWithLoader src={`${imageUrl}${imgWidth.poster[342]}${movieData.poster_path}`} ratio={posterRatio} />
      </div>
      <div className='flex items-center flex-1 2 p-3 rounded-lg'>

        <div className='flex-1 grid grid-cols-2  mx-3 gap-10   text-sm flex-wrap'>
          <div className='flex flex-col gap-1 items-start '>
            <p className='font-light '>Original Title</p>
            <p className=' font-semibold'>{movieData.original_title}</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light '>Directed by</p>
            {movieData.credits.crew.filter((crew: any) => crew.job === 'Director')
              .map((director: any) => (
                <div key={director.id} className='flex flex-col gap-1 items-start'>
                  <p className=' font-semibold'>{director.name}</p>
                </div>
              ))}
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light '>Production</p>
            <div className='font-semibold flex flex-col '>
              {movieData.production_countries.map((country: any) => (
                <p key={country.name}>{country.name}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start '>
            <p className='font-light '>Spoken Languages</p>
            <div className='font-semibold flex flex-col'>
              {movieData.spoken_languages.map((language: any) => (
                <p key={language.english_name}>{`${language.name} ${language.english_name === language.name ? "" : `(${language.english_name})`}`}</p>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1 items-start '>
            <p className='font-light '>Duration</p>
            <p className=' font-semibold'>{movieData.runtime} mins ({formatMinutes(movieData.runtime)})</p>
          </div>
          <div className='flex flex-col gap-1 items-start '>
            <p className='font-light '>Status</p>
            <p className=' font-semibold'>{movieData.status}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 bg-secondary/40 rounded-lg px-7 justify-center  '>
        <RadialChart data={{ value: movieData.vote_average, total: movieData.vote_count }} />
      </div>

    </div>
  );
}

export default MovieOverviewSection


