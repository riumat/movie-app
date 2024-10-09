import NameCard from '@/components/NameCard';
import { imageUrl, imgWidth, placeholders } from '@/utils/constants';
import { formattedCrewList } from '@/utils/functions';
import { CrewMember } from '@/utils/types';
import React from 'react';

interface CrewSectionProps {
  crew: CrewMember[];
}

const CrewSection: React.FC<CrewSectionProps> = ({ crew }) => {
  return (
    <div className='flex justify-center gap-10'>
      {formattedCrewList(crew).map((member) => (
        <div key={member.id} className='flex flex-col items-center gap-2'>
          <p className='text-[14px]'>{member.job?.join(', ')}</p>
          <div className='flex gap-2  justify-center items-center '>
            <div className='flex gap-2 relative'>
              <NameCard
                name={member.name}
                imagePath={member.profile_path ? `${imageUrl}${imgWidth.profile[185]}${member.profile_path}` : `${placeholders.profile}`}
                desc={(member.character ?? member.job) as string}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrewSection;