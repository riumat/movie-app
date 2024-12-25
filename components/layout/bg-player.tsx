"use client"
import { imageUrl, imgWidth, youtubeUrl } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

const BackgroundPlayer = ({ video }: { video: { url: string, title: string, id: number, poster: string } }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className='absolute h-[90%] w-full top-0  overflow-hidden -z-10'>
      {/* {domLoaded && ( */}
        <>
          <div className="absolute top-0 mx-auto w-[90%] h-full right-0 " >
            <Image
              priority
              src={`${imageUrl}${imgWidth.poster.original}${video.poster}`}
              alt={video.title}
              fill
              sizes={"(max-width: 768px) 100vh, (max-width: 1200px) 100vw"}
              quality={100}
              className="object-cover"
            />
          </div>
          {/* <ReactPlayer
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

              /> */}
        </>
      {/* )} */}

      <div className='hidden lg:block absolute top-0 right-0 mx-auto bg-gradient-to-r from-background via-background/20 to-transparent  z-0 w-[90%] h-full ' />
      <div className="absolute -bottom-[10px] left-0 w-[101%] h-full lg:h-[50%] bg-gradient-to-t from-background via-background/90 lg:via-background/80 to-transparent z-0 " />
      <div className="absolute w-full h-[50%] top-[30%] text-center lg:text-start lg:left-20 z-50 ">
        <p className="font-light text-lg mb-3">Top trending movie this week</p>
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
