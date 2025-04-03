import ExternalLinksList from '@/components/people/ext-links-list';
import { imageUrl, imgWidth } from '@/lib/constants';
import { formatDate, getAge } from '@/lib/functions';
import { PersonData } from '@/lib/types/person.types';
import Image from 'next/image';
import React from 'react';

const PersonHeader = ({ personData }: { personData: PersonData }) => {
  return (
    <div className="relative w-full text-foreground  ">
      <div className='flex justify-start items-start gap-3 lg:gap-10 lg:ml-28 '>
        <div className='flex flex-col gap-3 '>
          {personData.profile_path !== null && personData.profile_path !== '' && (
            <Image
              src={`${imageUrl}${imgWidth.profile[632]}${personData.profile_path}`}
              alt={personData.name}
              width={220}
              height={160}
              className="rounded-md "
            />
          )}
      <ExternalLinksList externalIds={personData.external_ids} />

        </div>
        <div className='flex flex-col gap-5 '>
          <div className='flex flex-col gap-1'>
            {personData.name !== null && personData.name !== '' && (
              <h1 className="text-base lg:text-4xl font-bold">{personData.name}</h1>
            )}
          </div>
          <div className='flex flex-col gap-5 lg:gap-1 text-xs lg:text-base '>
            {personData.birthday !== null && personData.birthday !== '' && (
              <p>{formatDate(personData.birthday)}
                {personData.deathday && ` - ${formatDate(personData.deathday)}`}
                {` (${getAge(personData.birthday, personData.deathday)} years old)`}</p>
            )}
            {personData.place_of_birth !== null && personData.place_of_birth !== '' && (
              <p >{personData.place_of_birth}</p>
            )}
          </div>

          <p className='text-xs lg:text-base'><span className=" ">Department:</span> {personData.known_for_department}</p>

        </div>
        
      </div>

    </div>
  );
};

export default PersonHeader;
