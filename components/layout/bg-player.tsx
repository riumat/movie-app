"use client"
import { imageUrl, imgWidth, youtubeUrl } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

const BackgroundPlayer = ({ video }: { video: { url: string, title: string, id: number, poster: string } }) => {
  const [isEnded, setIsEnded] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className='absolute h-[100vh] w-full -top-40 overflow-hidden -z-10'>
      {domLoaded && (
        <>
          {
            isEnded ? (
              <div className="absolute top-0 mx-auto w-full h-full " >
                <Image
                  src={`${imageUrl}${imgWidth.poster.original}${video.poster}`}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
                  sizes="100vw"
                />
              </div>
            ) : (
              <ReactPlayer
                url={`${youtubeUrl}${video.url}&end=60`}
                loading="lazy"
                fallback={<p>loading</p>}
                onEnded={() => setIsEnded(true)}
                volume={0}
                muted
                playing
                controls={false}
                width={1920}
                height={1080}

              />
            )
          }
        </>
      )}

      <div className='absolute top-0 left-0 bg-gradient-to-r from-background to-transparent  z-0 w-[35%] h-full ' />
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-background via-background/75 to-transparent z-0" />
      <div className="absolute w-full h-[50%] top-[40%] left-20 z-50">
        <p className="font-light">Top trending movie this week</p>
        <Link
          href={`/movies/${video.id}`}
          className="font-bold text-6xl "
        >
          <p className="text-foreground"> {video.title}</p>
        </Link>
      </div>
    </div >
  );
};

export default BackgroundPlayer;
