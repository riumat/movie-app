import NameCard from '@/components/NameCard';
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
    "Director of Photography",
    "Editor",
    "Music Composer"
  ];

  const crewByJob = relevantJobs.reduce((acc, job) => {
    acc[job] = crew.filter(member => member.job === job);
    return acc;
  }, {} as Record<string, CrewMember[]>);

  return (
    <section className="">
      <div className='flex flex-col gap-4'>
        {relevantJobs.map((job) => (
          crewByJob[job].length > 0 && (
            <div key={job} className='flex items-center gap-2 '>
              <p className='font-thin'>{job}</p>
              <div className='flex gap-2 flex-wrap justify-center items-center'>
                {crewByJob[job].map((member, index, array) => (
                  <div key={member.id} className='font-bold'>{member.name}{index < array.length - 1 ? ',' : ''}</div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default CrewSection;