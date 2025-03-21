"use client"
import ImageWithLoader from "@/components/layout/image-with-loader";
import Loader from "@/components/layout/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { imageUrl, imgWidth, placeholders, posterRatio } from "@/lib/constants";
import { formatDate } from "@/lib/functions";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

type SeasonsSectionProps = {
  season: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
  },
  showId: string
}


const SeasonModal = ({ season, showId }: SeasonsSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const imageSrc = season.poster_path ? `${imageUrl}${imgWidth.poster[342]}${season.poster_path}` : placeholders.multi;
  const customClassName = season.poster_path ? "" : "grayscale filter invert";

  const handleSeason = async () => {
    setIsLoading(true);
    await axios.post('/api/season', {
      number: season.season_number,
      showId: showId
    })
      .then(res => setEpisodes(res.data.episodes))
      .finally(() => setIsLoading(false))
      .catch(err => {
        console.error(err);
      });

  }
  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleSeason} className="cursor-pointer">
        <div className='flex flex-col gap-5 bg-transparent w-full max-w-[200px] rounded-lg mx-auto relative'>
          <div className="relative w-full max-h-60 pb-[150%] rounded-lg overflow-hidden ">
            <ImageWithLoader src={imageSrc} className={`rounded-lg ${customClassName}`} ratio={posterRatio} />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <p className="text-xl font-bold text-neutral-900 dark:text-white">
              {season.name}
            </p>
            <div className='flex flex-col items-center gap-2'>
              <p className="font-normal text-sm text-neutral-800 dark:text-gray-400 border px-2 py-1 rounded-xl">
                {formatDate(season.air_date)}
              </p>
              <p className="font-normal text-sm text-neutral-800 dark:text-gray-400 border px-2 py-1 rounded-xl">
                {season.episode_count} {season.episode_count === 1 ? "episode" : "episodes"}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[60vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">{season.name}</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto scrollbar-thin">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            <div>
              {episodes.length > 0 && (
                episodes.map((episode, index) => (
                  <div key={episode.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10">

                      </div>
                      <div className="flex items-center gap-3">
                        <p>{index + 1}</p>
                        <p className="font-bold text-lg">{episode.name}</p>
                        <p className="text-sm text-neutral-500">
                          {formatDate(episode.air_date)}
                        </p>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SeasonModal
