import { imageUrl, imgWidth } from '@/utils/constants';
import Image from 'next/image';
import React from 'react';

interface Image {
  file_path: string;
}

interface MovieData {
  title: string;
  release_date: string;
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
  }[],
}

interface MovieComponentProps {
  images: {
    file_path: string,
  }[];
  movieData: MovieData;
  logo: {
    iso_639_1: string,
    file_path: string,
  }[],
}

const NameSection: React.FC<MovieComponentProps> = ({ images, movieData }) => {
  return (
    <div className="relative min-h-[300px] w-full ">

      <div className="absolute inset-0 z-0 ">
        <div className="flex h-full">
          {images.slice(0, 1).map((path, index) => (
            <div key={index} className="flex-1 relative">
              <Image
                src={`${imageUrl}${imgWidth.backdrop.original}${path.file_path}`}
                alt={index.toString()}
                layout="fill"
                objectFit="cover"
                className="filter grayscale-[60%] brightness-90"
                priority
              />
            </div>
          ))}
        </div>
      </div >

      <div className="absolute inset-0 flex flex-col gap-5 justify-end items-center  text-white p-5 bg-gradient-to-b from-transparent via-60% via-black/80 to-black ">
        <h2 className="text-4xl font-bold mb-2 ">{movieData.title}</h2>
        <div className='w-[50%] flex justify-center items-center'>
          {movieData.production_companies.map((company, index) => (
            company.logo_path && (
              <div key={index} className={`flex-1 flex justify-center`}>
                <Image
                  src={`${imageUrl}${imgWidth.logo[154]}${company.logo_path}`}
                  width={100}
                  height={100}
                  alt={company.name}
                  style={{ width: 'auto', height: 'auto', maxWidth: '120px', maxHeight: '50px', filter: 'grayscale(100%) contrast(90%) brightness(100%) invert(1)' }}
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
