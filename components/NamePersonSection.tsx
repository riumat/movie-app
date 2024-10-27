import { imageUrl, imgWidth } from '@/utils/constants';
import { formatDate, formatMinutes, formatTvDuration } from '@/utils/functions';
import { MovieData, PersonData, TvData } from '@/utils/types';
import Image from 'next/image';
import React from 'react';


interface MovieComponentProps {
  images: string,
  personData: PersonData;
}

const NamePersonSection: React.FC<MovieComponentProps> = ({ images, personData }) => {
  return (
    <div className="relative min-h-[500px] w-full flex gap-5 ">

      <div className="flex-1 flex flex-col gap-10 justify-center items-center text-white p-5 bg-gradient-to-l from-neutral-950/10 via-30% via-neutral-950/90 to-neutral-950 ">
        <div className='flex w-[80%] gap-5 items-center'>
          {personData.profile_path !== null && personData.profile_path !== '' && (
            <Image
              src={`${imageUrl}${imgWidth.profile[632]}${personData.profile_path}`}
              alt={personData.name}
              width={200}
              height={200}
              className="rounded-xl"
            />
          )}
          <div className='flex flex-col gap-5'>
            {personData.name !== null && personData.name !== '' && (
              <h1 className="text-4xl font-bold">{personData.name}</h1>
            )}

            {personData.birthday !== null && personData.birthday !== '' && (
              <p>{formatDate(personData.birthday)} {personData.deathday&&`(${formatDate(personData.deathday)})`}</p>
            )}
            {personData.place_of_birth !== null && personData.place_of_birth !== '' && (
              <p>{personData.place_of_birth}</p>
            )}
            <p><span className="font-thin">Known for:</span> {personData.known_for_department}</p>
          </div>
        </div>
      </div>

      <div className='flex-1 bg-gradient-to-l from-neutral-800 to-neutral-950 text-sm text-neutral-100 mx-10 py-5 px-5 rounded-2xl flex flex-col gap-2 mt-5'>
        <p className='font-bold text-base text-center'>General Info</p>
        {personData.biography !== null && personData.biography !== '' && (
          <p className="text-sm leading-7 font-light">{personData.biography}</p>
        )}
      </div>



    </div>
  );
};

export default NamePersonSection;
