import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { BeatLoader } from 'react-spinners'
import { imageUrl, imgWidth, placeholders } from '@/lib/constants'
import { formatDate } from '@/lib/functions'

interface SeasonsSectionProps {
  seasons: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
  }[]
}


const SeasonsSection: React.FC<SeasonsSectionProps> = ({ seasons }) => {

  const params = useParams();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const { id } = params;
  const onLoadCallback = () => {
    setIsImageLoaded(true);
  };
  const onErrorCallback = () => {
    setIsImageLoaded(false);
  };
  return (
    <section className="flex flex-col justify-start gap-5 overflow-y-auto h-full w-full scrollbar-thin">
      {seasons.map((season) => (
        <Link key={season.id} href={`/tv/${id}/season/${season.season_number}`} className='flex gap-5 items-center'>
          <div className="relative rounded-lg h-72 min-w-48 ">
            {!isImageLoaded && (
              <BeatLoader color='#ffffff' size={10} />
            )}
            <Image
              src={season.poster_path ? `${imageUrl}${imgWidth.poster[342]}${season.poster_path}` : placeholders.multi}
              alt={"season poster"}
              onLoad={onLoadCallback}
              onError={onErrorCallback}
              fill
              className={`rounded-lg object-cover  ${season.poster_path ? "" : "grayscale filter invert"}`}
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
          </div>
          <div className='flex flex-col items-start gap-2'>
            <p className="text-xl font-bold text-neutral-900 dark:text-white">
              {season.name}
            </p>
            <p className="font-normal text-sm text-neutral-800 dark:text-gray-400">
              {formatDate(season.air_date)}
            </p>
            <p className="font-normal text-sm text-neutral-800 dark:text-gray-400">
              {season.overview}
            </p>
            <p className="font-normal text-sm text-neutral-800 dark:text-gray-400">
              {season.episode_count} {season.episode_count === 1 ? "episode" : "episodes"}
            </p>

          </div>
        </Link>
      ))}
    </section>
  )
}

export default SeasonsSection
