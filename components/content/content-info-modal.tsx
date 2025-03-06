"use client"
import OrizontalCard from "@/components/cards/orizontal-card";
import ImageWithLoader from "@/components/layout/image-with-loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { imageUrl, imgWidth, posterRatio } from "@/lib/constants";
import { formatDate } from "@/lib/functions";
import { MovieData } from "@/lib/types/movie.types";
import { TvData } from "@/lib/types/tv.types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ContentInfoModal = ({ content }: { content: MovieData | TvData }) => {

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer w-full rounded-sm" >
        <OrizontalCard item={content} />
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] lg:max-w-[25vw] h-[80vh] overflow-hidden flex flex-col justify-center gap-8" >
        <DialogHeader >
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="w-[75%] lg:w-[85%] h-full relative">
            <ImageWithLoader className="rounded-lg" src={`${imageUrl}${imgWidth.poster[500]}${content.poster_path}`} ratio={posterRatio} />
          </div>
          <div className="h-full flex flex-col gap-3 items-center">
            <h1 className="text-xl font-bold">{content.media_type === "movie" ? content.title : content.name}</h1>
            <div className="flex gap-5">
              <div className="flex items-center gap-5 text-sm lg:text-base">
                {content.media_type === "movie" ? (
                  <p>{formatDate(content.release_date)}</p>
                ) : (
                  <p>{formatDate(content.first_air_date)}</p>
                )}
                <Button variant="default" size="sm" className="w-32 lg:w-40" >
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
          </div>

        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ContentInfoModal
