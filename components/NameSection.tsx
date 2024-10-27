import { imageUrl, imgWidth } from '@/utils/constants';
import { formatDate, formatMinutes, formatTvDuration } from '@/utils/functions';
import { MovieData, TvData } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

interface MovieComponentProps {
  contentData: MovieData | TvData;
}

const NameSection: React.FC<MovieComponentProps> = ({ contentData }) => {
  return (
    <div className="relative min-h-[400px] w-full ">

      <div className="absolute inset-0 flex flex-col gap-10 justify-end  items-center  text-neutral-100 p-5 bg-gradient-to-b from-neutral-950/10 via-60% via-neutral-950/90 to-neutral-950 ">
        <h2 className="text-3xl font-bold  ">{contentData.type === "movie" ? contentData.title : contentData.name}</h2>
        <div className='w-[60%] flex  gap-5 xl:gap-10 justify-center items-center relative '>
          {contentData.production_companies.slice(0, 4).map((company, index) => (
            company.logo_path && (
              <div key={index} className={`relative flex justify-center w-[80px] h-[50px]`}>
                <Image
                  src={`${imageUrl}${imgWidth.logo[154]}${company.logo_path}`}
                  fill
                  alt={company.name}
                  style={{ maxWidth: '120px', maxHeight: '50px' }}
                  className='object-contain filter grayscale-[100%] contrast-[90%] brightness-[100%] invert-[1]'
                  priority
                />
              </div>
            )
          ))}
        </div>
        <div className=' flex flex-col justify-end gap-5 w-full text-sm'>
          <div className='w-full flex justify-center'>
            <p className='font-bold'>{contentData.tagline}</p>
          </div>
          <div className='flex justify-evenly items-center '>
            <div className='flex gap-12'>
              {contentData.type === "tv" ? (
                <>
                  <p>{formatTvDuration(contentData.first_air_date, contentData.last_air_date)}</p>
                  <p>{`${contentData.seasons.length} ${contentData.seasons.length === 1 ? "season" : "seasons"}`}</p>
                  <p>{contentData.status}</p>
                </>
              ) : (
                <>
                  <p>{formatDate(contentData.release_date)}</p>
                  <p>{formatMinutes(contentData.runtime)}</p>
                </>
              )}
              <div>
                {contentData.genres.map((genre, index, array) => (
                  <span key={genre.id} className="mr-2">
                    {genre.name}{index < array.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default NameSection;
