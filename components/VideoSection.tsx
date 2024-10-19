"use client";
import React, { useState } from 'react';
import YouTube from 'react-youtube';

interface VideoInfo {
  key: string,
  name: string,
  type: string,
  official: boolean,
}

interface VideoSectionProps {
  videoInfo: VideoInfo[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoInfo }) => {
  const opts = {
    height: '200',
    width: '340',
    playerVars: {
      autoplay: 0 as 0 | 1 | undefined,
    },
  };

  if (videoInfo && videoInfo.length === 0) {
    return (
      <div className='flex gap-2 justify-evenly items-center '>
        <p>No trailers found</p>
      </div>
    )
  }


  return (
    <div className='flex gap-2 justify-evenly items-center '>
      {videoInfo.slice(0, 2).map((video) => (
        <div key={video.key} className="video-section">
          <p className='text-center text-sm'>{video.name}</p>
          <YouTube
            videoId={video.key}
            opts={opts}
            loading='lazy'
          />
        </div>
      ))}

    </div>
  );
};

export default VideoSection;
