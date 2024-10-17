import { imageUrl, imgWidth } from '@/utils/constants';
import { MovieData, TvData } from '@/utils/types';
import Image from 'next/image';
import React from 'react';


interface MovieComponentProps {
  images: {
    file_path: string,
  }[];
  contentData: MovieData | TvData;
}

const NameSection: React.FC<MovieComponentProps> = ({ images, contentData }) => {
  return (
    <div className="relative min-h-[300px] w-full ">

      <div className="absolute inset-0 z-0 ">
        <div className="flex h-full">
          {images.slice(0, 1).map((path, index) => (
            <div key={index} className="flex-1 relative">
              <Image
                src={`${imageUrl}${imgWidth.backdrop.original}${path.file_path}`}
                alt={index.toString()}
                className="filter grayscale-[60%] brightness-90 object-cover "
                priority
                fill
              />
            </div>
          ))}
        </div>
      </div >

      <div className="absolute inset-0 flex flex-col gap-5 justify-end items-center  text-white p-5 bg-gradient-to-b from-transparent via-60% via-black/80 to-black ">
        <h2 className="text-4xl font-bold mb-2 ">{contentData.type === "movie" ? contentData.title : contentData.name}</h2>
        <div className='w-[60%] flex  gap-5 xl:gap-10 justify-center items-center relative'>
          {contentData.production_companies.map((company, index) => (
            company.logo_path && (
              <div key={index} className={`relative flex justify-center w-[100px] h-[50px]`}>
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
      </div>

    </div>
  );
};

export default NameSection;
