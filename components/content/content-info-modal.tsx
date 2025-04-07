"use client"
import ImageWithLoader from "@/components/layout/image-with-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { imageUrl, imgWidth, posterRatio, tmdbMovieGenres, tmdbTvGenres } from "@/lib/constants";
import { formatDate } from "@/lib/functions";
import { MovieData } from "@/lib/types/movie.types";
import { PersonResult } from "@/lib/types/person.types";
import { TvData } from "@/lib/types/tv.types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const ContentInfoModal = ({ content, trigger }: { content: MovieData | TvData | PersonResult, trigger: ReactNode }) => {
  const path = content.media_type === "person" ? content.profile_path : content.poster_path
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer w-full rounded-sm" >
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-[550px] max-h-[80vh] overflow-x-hidden overflow-y-auto flex flex-col justify-start gap-3 lg:gap-10" >
        <DialogHeader className="w-0 h-0 hidden" >
          <DialogTitle className="w-0 h-0" />
          <DialogDescription className="w-0 h-0" />
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 h-full ">
          <div className="w-[60%] sm:w-[50%] md:w-[45%] lg:w-[50%] relative">
            <ImageWithLoader className="rounded-lg" src={`${imageUrl}${imgWidth.poster[500]}${path}`} ratio={posterRatio} />
          </div>

          <div className=" flex flex-col gap-3 items-center justify-evenly w-full flex-1">
            <h1 className="text-xl text-center font-bold">{content.media_type === "movie" ? content.title : content.name}</h1>

            {content.media_type === "movie" ? (
              <>
                <p className="text-sm">{formatDate(content.release_date)}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {content.genre_ids.map((id) => (
                    <Badge variant="secondary" key={id}>
                      {tmdbMovieGenres[id as keyof typeof tmdbMovieGenres]}
                    </Badge>
                  ))}
                </div>
              </>

            ) : content.media_type === "tv" ? (
              <>
                <p className="text-sm">{formatDate(content.first_air_date)}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {content.genre_ids.map((id) => (
                    <Badge variant="secondary" key={id}>
                      {tmdbTvGenres[id as keyof typeof tmdbTvGenres]}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">{content.known_for_department}</p>

              </>
            )}
            <Link
              href={`/${content.media_type}/${content.id}`}
              className=""
            >
              <Button variant="default" size="sm" className="w-32 lg:w-40 mt-5 flex justify-center items-center gap-2" >
                <span className="font-semibold ">Visit Page</span>
                <ArrowRight className=" !w-5 !h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ContentInfoModal
