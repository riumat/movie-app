"use client";
import { youtubeUrl } from '@/lib/constants';
import { VideoItem } from '@/lib/types/video';
import React, { use, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoSectionProps {
  videoInfo: {
    trailers: VideoItem[],
    clips: VideoItem[],
    feat: VideoItem[],
  };
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoInfo: { trailers, clips, feat } }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (trailers.length === 0 && clips.length === 0 && feat.length === 0) {
    return (
      <div className='flex gap-2 justify-evenly items-center '>
        <p className='font-bold text-2xl'>No videos found</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-20'>
      {trailers.length > 0 && (
        <div className='flex flex-col gap-2 justify-evenly items-center'>
          <p className='text-center text-2xl font-bold'>Trailers</p>
          <div className='flex justify-center gap-2 flex-wrap w-full'>
            {trailers.slice(0, 3).map((video) => (
              <div key={video.key} className='flex flex-col gap-2 items-center'>
                <ReactPlayer
                  key={video.key}
                  url={`${youtubeUrl}${video.key}`}
                  loading='lazy'
                  light
                  width={426}
                  height={240}
                  controls

                />
                <p className='text-center text-sm'>{video.name}</p>

              </div>
            ))}
          </div>
        </div>
      )}

      {clips.length > 0 && (
        <div className='flex flex-col gap-2 justify-evenly items-center'>
          <p className='text-center text-2xl font-bold'>Clips</p>
          <div className='flex justify-center gap-2 flex-wrap w-full'>
            {clips.slice(0, 2).map((video) => (
              <div key={video.key} className="flex flex-col gap-2 items-center">
                <ReactPlayer
                  url={`${youtubeUrl}${video.key}`}
                  loading='lazy'
                  light
                  width={426}
                  height={240}
                  controls

                />
                <p className='text-center text-sm'>{video.name}</p>

              </div>
            ))}
          </div>
        </div>
      )}
      {feat.length > 0 && (
        <div className='flex flex-col gap-2 justify-evenly items-center'>
          <p className='text-center text-2xl font-bold'>Features</p>
          <div className='flex justify-center gap-2 flex-wrap w-full'>

            {feat.slice(0, 2).map((video) => (
              <div key={video.key} className="flex flex-col gap-2 items-center">
                <ReactPlayer
                  url={`${youtubeUrl}${video.key}`}
                  loading='lazy'
                  light
                  width={426}
                  height={240}
                  controls

                />
                <p className='text-center text-sm'>{video.name}</p>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;

