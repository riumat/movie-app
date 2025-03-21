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
import { TvData } from "@/lib/types/tv.types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const ContentInfoModal = ({ content, trigger }: { content: MovieData | TvData, trigger: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer w-full rounded-sm" >
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] lg:max-w-[500px] h-[80vh] overflow-hidden flex flex-col justify- gap-8" >
        <DialogHeader className="w-0 h-0" >
          <DialogTitle className="w-0 h-0" />
          <DialogDescription className="w-0 h-0" />
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="w-[75%] lg:w-[270px] h-full relative">
            <ImageWithLoader className="rounded-lg" src={`${imageUrl}${imgWidth.poster[500]}${content.poster_path}`} ratio={posterRatio} />
          </div>

          <div className="h-full flex flex-col gap-3 items-center">
            <h1 className="text-xl font-bold">{content.media_type === "movie" ? content.title : content.name}</h1>

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

            ) : (
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
            )}

            <Button variant="default" size="sm" className="w-32 lg:w-40 mt-5" >
              <Link
                href={`/${content.media_type}/${content.id}`}
                className="flex justify-center items-center gap-2"
              >
                <p>Visit Page</p>
                <ArrowRight size={24} />
              </Link>
            </Button>

          </div>

        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ContentInfoModal
