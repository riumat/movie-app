"use client";
import { VideoItem } from '@/lib/types/video';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoSectionProps {
  videoInfo: {
    trailers: VideoItem[],
    clips: VideoItem[],
    feat: VideoItem[],
  };
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoInfo: { trailers, clips, feat } }) => {
  const opts = {
    height: '200',
    width: '340',
    playerVars: {
      autoplay: 0 as 0 | 1 | undefined,
    },
  };

  if (trailers.length === 0 && clips.length === 0 && feat.length === 0) {
    return (
      <div className='flex gap-2 justify-evenly items-center '>
        <p>No videos found</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {trailers.length > 0 && (
        <div className='flex gap-2 justify-evenly items-center'>
          <p className='text-center text-sm'>Trailers:</p>
          {trailers.slice(0, 2).map((video) => (
            <div key={video.key} className="video-section">
              <p className='text-center text-sm'>{video.name}</p>
              <ReactPlayer
                url={video.key}
                opts={opts}
                loading='lazy'
              />
            </div>
          ))}
        </div>
      )}
      {clips.length > 0 && (
        <div className='flex gap-2 justify-evenly items-center'>
          <p className='text-center text-sm'>Clips:</p>
          {clips.slice(0, 2).map((video) => (
            <div key={video.key} className="video-section">
              <p className='text-center text-sm'>{video.name}</p>
              <ReactPlayer
                url={video.key}
                opts={opts}
                loading='lazy'
              />
            </div>
          ))}
        </div>
      )}
      {feat.length > 0 && (
        <div className='flex gap-2 justify-evenly items-center'>
          <p className='text-center text-sm'>Features:</p>
          {feat.slice(0, 2).map((video) => (
            <div key={video.key} className="video-section">
              <p className='text-center text-sm'>{video.name}</p>
              <ReactPlayer
                url={video.key}
                opts={opts}
                loading='lazy'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSection;

