import React from 'react';
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
    height: '180',
    width: '250',
    playerVars: {
      autoplay: 0 as any,
    },
  };

  return (
    <div className='flex flex-col gap-2 justify-start items-center flex-1'>
      {videoInfo && videoInfo.length > 0 ? (
        videoInfo.map((video) => (
          <div key={video.key} className="video-section">
            <p className='text-center text-[14px]'>{video.name}</p>
            <YouTube videoId={video.key} opts={opts} />
          </div>
        ))
      ) : (
        <p>No trailers found</p>
      )}
    </div>
  );
};

export default VideoSection;
