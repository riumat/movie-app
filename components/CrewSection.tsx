import NameCard from '@/components/NameCard';
import { imageUrl, imgWidth } from '@/utils/constants';
import React from 'react';

interface CrewMember {
  job: string;
  name: string;
  id: number;
  profile_path: string;
}

interface CrewSectionProps {
  crew: CrewMember[];
}

const CrewSection: React.FC<CrewSectionProps> = ({ crew }) => {
  const relevantJobs = [
    "Director",
    "Writer",
    "Screenplay",
    "Director of Photography",
    "Editor",
    "Music Composer",
  ];
  

  const crewList = crew
    .filter(member => relevantJobs.includes(member.job))
    .reduce((acc, member) => {
      const existingMember = acc.find(m => m.id === member.id);
      if (existingMember) {
        existingMember.job.push(member.job);
      } else {
        acc.push({
          id: member.id,
          name: member.name,
          profile_path: member.profile_path,
          job: [member.job]
        });
      }
      return acc;
    }, [] as Array<{ id: number; name: string; profile_path: string; job: string[] }>)
    .sort((a, b) => {
      const jobA = a.job[0];
      const jobB = b.job[0];
      return relevantJobs.indexOf(jobA) - relevantJobs.indexOf(jobB);
    });

  return (
    <section className="relative">
      <div className='flex  gap-4 relative'>
        {crewList.map((member) => (
          <div key={member.id} className='flex flex-col items-center gap-2'>
            <p className='text-[14px]'>{member.job.join(', ')}</p>
            <div className='flex gap-2  justify-center items-center '>
              <div className='flex gap-2 relative'>
                <NameCard name={member.name} imagePath={`${imageUrl}${imgWidth.profile[185]}${member.profile_path}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CrewSection;