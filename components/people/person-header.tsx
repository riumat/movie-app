import AuthModal from '@/components/auth/auth-modal';
import ExternalLinksList from '@/components/people/ext-links-list';
import ToggleFollow from '@/components/people/toggle-follow';
import { imageUrl, imgWidth } from '@/lib/constants';
import { formatDate, getAge } from '@/lib/functions';
import { PersonData } from '@/lib/types/people';
import Image from 'next/image';
import React from 'react';

const PersonHeader = ({ personData }: { personData: PersonData }) => {
  return (
    <div className="relative w-full text-foreground px-5">
      <div className='flex justify-start items-start gap-10 ml-28'>
        <div className='flex flex-col gap-5'>
          {personData.profile_path !== null && personData.profile_path !== '' && (
            <Image
              src={`${imageUrl}${imgWidth.profile[632]}${personData.profile_path}`}
              alt={personData.name}
              width={220}
              height={160}
              className="rounded-md"
            />
          )}
        </div>
        <div className='flex flex-col gap-7 '>
          <div className='flex flex-col gap-1'>
            {personData.name !== null && personData.name !== '' && (
              <h1 className="text-4xl font-bold">{personData.name}</h1>
            )}
            <ExternalLinksList externalIds={personData.external_ids} />
          </div>
          <div className='flex flex-col gap-1  text-sm'>
            {personData.birthday !== null && personData.birthday !== '' && (
              <p className='font-light'>{formatDate(personData.birthday)}
                {personData.deathday && ` - ${formatDate(personData.deathday)}`}
                {` (${getAge(personData.birthday, personData.deathday)} years old)`}</p>
            )}
            {personData.place_of_birth !== null && personData.place_of_birth !== '' && (
              <p className='font-light'>{personData.place_of_birth}</p>
            )}
          </div>

          <p><span className="font-thin">Department:</span> {personData.known_for_department}</p>

          {personData.user ? (
            <ToggleFollow following={personData.user} personId={personData.id} />
          ) : (
            <AuthModal
              isOpen={false}
              label="Login to follow"
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default PersonHeader;
