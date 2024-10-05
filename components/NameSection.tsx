import { imageUrl } from '@/utils/constants';
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
  }[]
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

//fix lingua titolo film

const NameSection: React.FC<MovieComponentProps> = ({ images, movieData, logo }) => {
  return (
    <div className="relative min-h-[300px] ">

      <div className="absolute inset-0 z-0 ">
        <div className="flex h-full">
          {images.slice(0, 2).map((path, index) => (
            <div key={index} className="flex-1 relative">
              <Image
                src={`${imageUrl}/w780${path.file_path}`}
                alt={index.toString()}
                layout="fill"
                objectFit="cover"
                className="filter grayscale-[80%] brightness-90"
                priority
              />
            </div>
          ))}
        </div>
      </div >

      

      <div className="absolute inset-0 flex flex-col gap-5 justify-end items-center  text-white p-5 bg-gradient-to-b from-transparent via-black/85 to-black ">
        {/* <h2 className="text-3xl font-bold mb-2 ">{movieData.title}</h2> */}
        <Image
          src={`${imageUrl}/w780${logo.filter((l) => l.iso_639_1 === "en")[0].file_path}`}
          width={200}
          height={200}
          alt={"logo"}
          style={{ width: 'auto', height: 'auto', maxWidth: '300px', maxHeight: '150px', filter: 'grayscale(100%) contrast(0%) brightness(100%) ' }}
          priority
        />
        <div className='w-[50%] flex justify-center items-center'>
          {movieData.production_companies.map((company, index) => (
            company.logo_path && (
              <div key={index} className={`flex-1 flex justify-center`}>
                <Image
                  src={`${imageUrl}/w780${company.logo_path}`}
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
