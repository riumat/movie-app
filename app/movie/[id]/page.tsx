import { notFound } from 'next/navigation';
import { MovieData } from '@/lib/types/movie';
import { getContentData, getGenericContentData } from '@/lib/fetchers/index';
import { formatNumber, getDaysSince, rateMovieFinance } from '@/lib/functions';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { boxOfficeResults, imageUrl, imgWidth } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import RadialChart from '@/components/ui/radial-chart';

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const media = "movie"
  const movieData = await getGenericContentData(params.id, media)
    .catch(() => { notFound() })

  console.log(rateMovieFinance(movieData.budget, movieData.revenue, movieData.release_date))

  const boxOfficeData = boxOfficeResults[rateMovieFinance(movieData.budget, movieData.revenue, movieData.release_date)]

  return (
    <div className='flex gap-2  justify-between mx-10 '>
      <div className='flex gap-5 items-center flex-[1.5] text-sm '>
        <div className='w-52 h-72 relative' >
          <ImageWithLoader src={`${imageUrl}${imgWidth.poster[342]}${movieData.poster_path}`} />
        </div>
        <div className='flex flex-col gap-1 items-start justify-evenly h-full'>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-light text-sm'>Original Title</p>
            <p className='font-bold'>{movieData.original_title}</p>
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
      <div className={`flex flex-col  items-center justify-center gap-5  rounded-lg flex-1 `}>
        <div className='flex gap-5'>
          <div className='flex flex-col gap-1 items-center'>
            <p className='font-light'>Budget</p>
            <p className='font-bold'>{formatNumber(movieData.budget)}$</p>
          </div>
          <Separator orientation='vertical' />
          <div className='flex flex-col gap-1 items-center'>
            <p className='font-light'>Revenue</p>
            <p className='font-bold'>{formatNumber(movieData.revenue)}$</p>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>{getDaysSince(movieData.release_date)} since release</p>
        <div className='flex items-center gap-1'>
          <p className='font-light'>Box Office Status:</p>
          <p className={`font-semibold`}>{boxOfficeData.value}</p>
        </div>
      </div>
      <div className='flex-1 flex justify-center '>
        <RadialChart data={{ value: movieData.vote_average, total: movieData.vote_count }} />
      </div>
      <div className='flex-1 flex justify-center '>
        <p>Friends who watched it: {movieData.user.map((user: any) => user.username)}</p>
      </div>
    </div>
  );
}

export default MoviePage


