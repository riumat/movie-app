import React from 'react';
import Link from 'next/link';
import NameCard from '@/components/NameCard';

interface CreditsListProps {
  personList: {
    id: number;
    name: string;
    profile_path: string;
    character?: string;
    job?: string;
  }[];
}

const CreditsList: React.FC<CreditsListProps> = ({ personList }) => {
  return (

    <div className=" h-full ">
      {personList.length > 0 && (
        <div className='flex flex-col gap-4 items-center justify-items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
            {personList.slice(0, 50).map((person) => ( //optimize without slice ty
              <Link
                key={person.id}
                href={`/person/${person.id}`}
              >
                <NameCard
                  name={person.name}
                  imagePath={person.profile_path}
                  desc={((person.character ?? person.job) ?? "Creator")}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CreditsList;

