import ExternalLinksList from '@/components/people/ext-links-list';
import KnownForSection from '@/components/people/known-section';
import { imageUrl, imgWidth } from '@/lib/constants';
import { formatDate } from '@/lib/functions';
import { PersonData } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

const PersonHeader = ({ personData }: { personData: PersonData }) => {
  return (
      <div className="relative min-h-[500px] w-full flex-1 flex flex-col gap-10 justify-center items-center text-foreground p-5  ">
        <div className='flex w-full gap-5 '>
          <div className='flex flex-col gap-2'>
            {personData.profile_path !== null && personData.profile_path !== '' && (
              <Image
                src={`${imageUrl}${imgWidth.profile[632]}${personData.profile_path}`}
                alt={personData.name}
                width={330}
                height={300}
                className="rounded-xl"
              />
            )}
            <ExternalLinksList externalIds={personData.external_ids} />
          </div>
          <div className='flex flex-col gap-5 flex-1'>
            {personData.name !== null && personData.name !== '' && (
              <h1 className="text-5xl font-bold">{personData.name}</h1>
            )}

            {personData.birthday !== null && personData.birthday !== '' && (
              <p>{formatDate(personData.birthday)} {personData.deathday && `(${formatDate(personData.deathday)})`}</p>
            )}
            {personData.place_of_birth !== null && personData.place_of_birth !== '' && (
              <p>{personData.place_of_birth}</p>
            )}

            <p><span className="font-thin">Known for:</span> {personData.known_for_department}</p>
            <KnownForSection contents={personData.combined_credits} />

          </div>
        </div>


    </div>
  );
};

export default PersonHeader;
