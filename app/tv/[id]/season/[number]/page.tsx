import { fetchSeasonData } from '@/lib/fetchers';
import { SeasonData } from '@/lib/types';
import { notFound } from 'next/navigation';

export default async function SeasonPage({ params }: { params: { id: string, number: string } }) {
  const tvId = params.id;
  const seasonNumber = params.number;
  let seasonData: SeasonData;
  
  try {
    seasonData = await fetchSeasonData(tvId, seasonNumber);
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-20 w-full">
      {/*  <NameSection images={tvData.images.backdrops} contentData={tvData} />
      <div className='flex flex-col gap-5 w-full'>
        <div className='w-full flex justify-center'>
          <p className='font-bold'>{tvData.tagline}</p>
        </div>
        <div className='flex justify-evenly items-center '>
          <div className='flex gap-10'>
            <p>{formatTvDuration(tvData.first_air_date, tvData.last_air_date)}</p>
            <p>{`${tvData.seasons.length - 1} ${tvData.seasons.length === 1 ? "season" : "seasons"}`}</p>
            <p>{tvData.status}</p>
            <div>
              {tvData.genres.map((genre, index, array) => (
                <span key={genre.id} className="mr-2">
                  {genre.name}{index < array.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MediaTvHero tvData={tvData} /> */}
    </div>
  );
}


